module {
  type OldActor = {
    state : { var geminiApiKey : Text };
  };
  type NewActor = {};

  public func migration(_old : OldActor) : NewActor {
    {};
  };
};
