module {
  type OldActor = {};

  type NewActor = {
    state : { var geminiApiKey : ?Text };
  };

  public func migration(_old : OldActor) : NewActor {
    { state = { var geminiApiKey = null } };
  };
};
