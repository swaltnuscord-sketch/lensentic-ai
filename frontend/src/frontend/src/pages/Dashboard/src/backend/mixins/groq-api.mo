import Text "mo:core/Text";
import Blob "mo:core/Blob";
import Types "../types";
import GroqLib "../lib/groq";
import Error "mo:core/Error";

mixin (groqApiKeyState : { var groqApiKey : Text }) {

  /// Store a new Groq API key
  public shared func setGroqApiKey(key : Text) : async () {
    groqApiKeyState.groqApiKey := key;
  };

  /// Returns true if a real (non-placeholder, non-empty) key has been configured
  public query func getGroqApiKeyStatus() : async Bool {
    let k = groqApiKeyState.groqApiKey;
    k != "" and k != "gsk_YOUR_GROQ_API_KEY";
  };

  /// Call Groq API with the given prompt and conversation history
  public shared func askGemini(
    prompt : Text,
    history : [Types.ConversationTurn],
  ) : async { #ok : Types.GeminiResponse; #err : Text } {
    let groqApiKey = groqApiKeyState.groqApiKey;

    let url = "https://api.groq.com/openai/v1/chat/completions";
    let requestBodyText = GroqLib.buildRequestBody(prompt, history);
    let requestBodyBlob = requestBodyText.encodeUtf8();

    let ic = actor "aaaaa-aa" : actor {
      http_request : ({
        url : Text;
        max_response_bytes : ?Nat64;
        method : { #get; #head; #post };
        headers : [{ name : Text; value : Text }];
        body : ?Blob;
        transform : ?{
          function : shared ({ response : { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob }; context : Blob }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
          context : Blob;
        };
        is_replicated : ?Bool;
      }) -> async {
        status : Nat;
        headers : [{ name : Text; value : Text }];
        body : Blob;
      };
    };

    let httpResponse = try {
      await (with cycles = 3_000_000_000) ic.http_request({
        url = url;
        max_response_bytes = ?10000;
        method = #post;
        headers = [
          { name = "Content-Type"; value = "application/json" },
          { name = "Authorization"; value = "Bearer " # groqApiKey },
        ];
        body = ?requestBodyBlob;
        transform = null;
        is_replicated = ?false;
      });
    } catch (e) {
      return #err("HTTP request failed: " # e.message());
    };

    if (httpResponse.status < 200 or httpResponse.status >= 300) {
      let errBody = switch (httpResponse.body.decodeUtf8()) {
        case (?t) t;
        case null "(non-UTF8 error body)";
      };
      return #err("Groq API error (status " # debug_show httpResponse.status # "): " # errBody);
    };

    let responseText = switch (httpResponse.body.decodeUtf8()) {
      case null { return #err("Could not decode Groq response as UTF-8") };
      case (?t) t;
    };

    // Extract choices[0].message.content
    let rawContentText = switch (GroqLib.extractMessageContent(responseText)) {
      case null { return #err("Could not extract message content from Groq response: " # responseText) };
      case (?t) t;
    };

    // Determine if the raw content is a JSON-encoded string (starts with '"') or a plain object
    let trimmedContent = rawContentText.trimStart(#predicate(func(c) { c == ' ' or c == '\t' or c == '\n' or c == '\r' }));
    let firstChar = switch (trimmedContent.chars().next()) {
      case null { return #err("Empty content from Groq response") };
      case (?c) c;
    };

    // If content starts with '"', it is a JSON-encoded string — unescape it first
    let contentJson = if (firstChar == '\"') {
      GroqLib.unescapeJson(rawContentText);
    } else {
      // Already a plain JSON object string
      rawContentText;
    };

    // Parse aiResponse field — fallback to raw content if missing
    let aiResponse = switch (GroqLib.extractJsonField(contentJson, "aiResponse")) {
      case null {
        // Last resort: use the raw content itself so the user sees something
        if (contentJson.size() > 0) { contentJson } else { rawContentText };
      };
      case (?t) t;
    };

    // Parse followUpOptions array — fallback to default options if missing
    let followUpOptions = switch (GroqLib.extractJsonArray(contentJson, "followUpOptions")) {
      case null {
        ["Continue with this direction", "Explore alternatives", "Add more detail", "Start over"];
      };
      case (?arr) {
        if (arr.size() == 0) {
          ["Continue with this direction", "Explore alternatives", "Add more detail", "Start over"];
        } else { arr };
      };
    };

    #ok({ aiResponse; followUpOptions });
  };
};
