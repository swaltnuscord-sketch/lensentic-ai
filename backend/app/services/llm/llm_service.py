from app.services.llm.providers.gemini_provider import (
    GeminiProvider,
)


class LLMService:

    def __init__(self):
        self.provider = GeminiProvider()

    async def generate(
        self,
        prompt: str,
    ):
        return await self.provider.generate(
            prompt
        )