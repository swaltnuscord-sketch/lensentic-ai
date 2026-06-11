module {
  public type ConversationTurn = {
    role : Text;
    content : Text;
  };

  public type GeminiResponse = {
    aiResponse : Text;
    followUpOptions : [Text];
  };
};
