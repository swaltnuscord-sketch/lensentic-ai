import GroqApiMixin "mixins/groq-api";

actor {
  let groqApiKeyState : { var groqApiKey : Text };
  include GroqApiMixin(groqApiKeyState);
};

