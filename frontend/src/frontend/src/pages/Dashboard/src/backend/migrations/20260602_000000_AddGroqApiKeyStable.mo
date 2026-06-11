// Migration: Introduce groqApiKeyState as a standalone stable field.
// The geminiApiKey field was removed in 20260601_000000_RemoveStateField.mo,
// leaving the actor with no stable fields. This migration adds the
// groqApiKeyState record that holds the Groq API key with a safe placeholder
// default so existing deployments are not broken on upgrade.
module {
  type OldActor = {};

  type NewActor = {
    groqApiKeyState : { var groqApiKey : Text };
  };

  public func migration(_old : OldActor) : NewActor {
    { groqApiKeyState = { var groqApiKey = "gsk_YOUR_GROQ_API_KEY" } };
  };
};
