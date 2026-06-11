module {
  type OldActor = {
    state : { var geminiApiKey : ?Text };
  };
  type NewActor = {
    state : { var geminiApiKey : Text };
  };
  public func migration(old : OldActor) : NewActor {
    {
      state = {
        var geminiApiKey = switch (old.state.geminiApiKey) {
          case (?key) key;
          case null "YOUR_GEMINI_API_KEY_HERE";
        };
      };
    };
  };
};
