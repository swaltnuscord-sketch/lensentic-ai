import Text "mo:core/Text";
import Array "mo:core/Array";
import Char "mo:core/Char";

module {
  // Build OpenAI-compatible request body JSON for Groq
  public func buildRequestBody(prompt : Text, history : [{ role : Text; content : Text }]) : Text {
    let systemContent = "You are a cinematic AI storytelling assistant for Lensentic Studio. " #
      "You MUST always respond with valid JSON only. No markdown, no code fences, no explanation outside the JSON. " #
      "Format your response as a JSON object with exactly two fields: " #
      "\"aiResponse\" (a rich cinematic narrative response, 2-4 sentences) and " #
      "\"followUpOptions\" (an array of exactly 4 short creative choices, each max 8 words). " #
      "Example: {\"aiResponse\":\"The story begins...\",\"followUpOptions\":[\"Option one\",\"Option two\",\"Option three\",\"Option four\"]}";

    // Build messages array: system first, then history, then current prompt
    var messagesJson = "{\"role\":\"system\",\"content\":\"" # escapeJson(systemContent) # "\"}";

    for (turn in history.vals()) {
      let escaped = escapeJson(turn.content);
      messagesJson := messagesJson # ",{\"role\":\"" # turn.role # "\",\"content\":\"" # escaped # "\"}";
    };

    messagesJson := messagesJson # ",{\"role\":\"user\",\"content\":\"" # escapeJson(prompt) # "\"}";

    "{" #
      "\"model\":\"llama-3.3-70b-versatile\"," #
      "\"messages\":[" # messagesJson # "]," #
      "\"max_tokens\":4096," #
      "\"temperature\":0.8," #
      "\"response_format\":{\"type\":\"json_object\"}" #
    "}";
  };

  // Parse Groq/OpenAI response: extract choices[0].message.content
  public func extractMessageContent(responseBody : Text) : ?Text {
    // Strategy: find "message" object first, then find "content" inside it.
    // This avoids picking up "content" from earlier parts of the JSON.
    let msgMarker = "\"message\":";
    let parts = responseBody.split(#text msgMarker);
    ignore parts.next(); // skip before first "message":
    let afterMessage = switch (parts.next()) {
      case null {
        // Fallback: search for any "content":" in the body
        return extractFirstContentField(responseBody);
      };
      case (?t) t;
    };

    // Inside the message object, find "content":
    // content value may be a JSON-encoded string (starts with \") or a plain object
    let contentMarkerStr = "\"content\":";
    let contentParts = afterMessage.split(#text contentMarkerStr);
    ignore contentParts.next();
    switch (contentParts.next()) {
      case null {
        // Fallback: search whole body
        extractFirstContentField(responseBody);
      };
      case (?afterColon) {
        // Skip leading whitespace
        let trimmed = afterColon.trimStart(#predicate(func(c) { c == ' ' or c == '\t' or c == '\n' or c == '\r' }));
        if (trimmed.size() == 0) return null;
        let firstChar = switch (trimmed.chars().next()) {
          case null { return null };
          case (?c) c;
        };
        if (firstChar == Char.fromNat32(34)) {
          // It's a JSON-encoded string — extract without the leading quote
          let inner = textDropFirst(trimmed, 1);
          ?extractUntilEndQuote(inner);
        } else if (firstChar == '{') {
          // Plain JSON object — extract until balanced closing brace
          ?extractBalancedObject(trimmed);
        } else {
          // Try extracting as a string anyway
          ?extractUntilEndQuote(trimmed);
        };
      };
    };
  };

  // Extract a JSON string field value by key from a flat JSON object
  public func extractJsonField(json : Text, key : Text) : ?Text {
    let marker = "\"" # key # "\":\"";
    let parts = json.split(#text marker);
    ignore parts.next();
    switch (parts.next()) {
      case null null;
      case (?afterMarker) {
        ?extractUntilEndQuote(afterMarker);
      };
    };
  };

  // Extract a JSON array of strings by key
  public func extractJsonArray(json : Text, key : Text) : ?[Text] {
    let marker = "\"" # key # "\":[";
    let parts = json.split(#text marker);
    ignore parts.next();
    switch (parts.next()) {
      case null null;
      case (?afterBracket) {
        var arrContent = "";
        var depth = 0;
        var found = false;
        let chars = afterBracket.chars();
        label scan loop {
          switch (chars.next()) {
            case null { break scan };
            case (?c) {
              if (c == ']') {
                if (depth == 0) { found := true; break scan }
                else { depth := depth - 1; arrContent := arrContent # "]" };
              } else if (c == '[') {
                depth := depth + 1;
                arrContent := arrContent # "[";
              } else {
                arrContent := arrContent # Text.fromChar(c);
              };
            };
          };
        };
        if (not found) return null;
        let items = parseStringArray(arrContent);
        ?items;
      };
    };
  };

  // Fallback: extract the first "content":" value found anywhere in the body
  func extractFirstContentField(body : Text) : ?Text {
    let marker = "\"content\":\"";
    let parts = body.split(#text marker);
    ignore parts.next();
    switch (parts.next()) {
      case null null;
      case (?after) {
        ?extractUntilEndQuote(after);
      };
    };
  };

  // Drop the first n characters from a Text
  func textDropFirst(s : Text, n : Nat) : Text {
    var i = 0;
    var result = "";
    for (c in s.chars()) {
      if (i >= n) { result := result # Text.fromChar(c) };
      i := i + 1;
    };
    result;
  };

  // Extract the content of a balanced JSON object starting with '{'
  func extractBalancedObject(s : Text) : Text {
    var depth = 0;
    var result = "";
    var started = false;
    for (c in s.chars()) {
      if (c == '{') {
        depth := depth + 1;
        started := true;
        result := result # "{";
      } else if (started) {
        if (c == '}') {
          depth := depth - 1;
          result := result # "}";
          if (depth == 0) return result;
        } else {
          result := result # Text.fromChar(c);
        };
      };
    };
    result;
  };

  // Escape special characters for JSON string embedding
  public func escapeJson(s : Text) : Text {
    let dquote = Char.fromNat32(34);
    let bslash = Char.fromNat32(92);
    let newline = Char.fromNat32(10);
    let cr = Char.fromNat32(13);
    let tab = Char.fromNat32(9);
    var result = "";
    for (c in s.chars()) {
      let piece : Text = if (c == dquote) { "\\\"" }
        else if (c == bslash) { "\\\\" }
        else if (c == newline) { "\\n" }
        else if (c == cr) { "\\r" }
        else if (c == tab) { "\\t" }
        else { Text.fromChar(c) };
      result := result # piece;
    };
    result;
  };

  // Unescape JSON string escape sequences
  public func unescapeJson(s : Text) : Text {
    let dquote = Char.fromNat32(34);
    let bslash = Char.fromNat32(92);
    var result = "";
    var escaped = false;
    for (c in s.chars()) {
      if (escaped) {
        let piece : Text = if (c == dquote) { "\"" }
          else if (c == bslash) { "\\" }
          else if (c == 'n') { "\n" }
          else if (c == 'r') { "\r" }
          else if (c == 't') { "\t" }
          else { Text.fromChar(c) };
        result := result # piece;
        escaped := false;
      } else if (c == bslash) {
        escaped := true;
      } else {
        result := result # Text.fromChar(c);
      };
    };
    result;
  };

  // --- Private helpers ---

  func extractUntilEndQuote(s : Text) : Text {
    let dquote = Char.fromNat32(34);
    let bslash = Char.fromNat32(92);
    var result = "";
    var escaped = false;
    for (c in s.chars()) {
      if (escaped) {
        result := result # "\\" # Text.fromChar(c);
        escaped := false;
      } else if (c == bslash) {
        escaped := true;
      } else if (c == dquote) {
        return result;
      } else {
        result := result # Text.fromChar(c);
      };
    };
    result;
  };

  func parseStringArray(arrContent : Text) : [Text] {
    let dquote = Char.fromNat32(34);
    let bslash = Char.fromNat32(92);
    var items : [Text] = [];
    var inString = false;
    var current = "";
    var escaped = false;
    for (c in arrContent.chars()) {
      if (escaped) {
        current := current # Text.fromChar(c);
        escaped := false;
      } else if (inString) {
        if (c == bslash) {
          escaped := true;
        } else if (c == dquote) {
          items := items.concat([current]);
          current := "";
          inString := false;
        } else {
          current := current # Text.fromChar(c);
        };
      } else if (c == dquote) {
        inString := true;
      };
    };
    items;
  };
};
