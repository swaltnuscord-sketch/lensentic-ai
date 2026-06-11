import google.generativeai as genai

from app.core.config import settings


class GeminiProvider:

    def __init__(self):
        genai.configure(
            api_key=settings.GEMINI_API_KEY
        )

        self.model = genai.GenerativeModel(
            "gemini-1.5-flash"
        )

    async def generate(
        self,
        prompt: str,
    ):
        response = self.model.generate_content(
            prompt
        )

        return response.text