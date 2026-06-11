from app.services.providers.provider_manager import (
    ProviderManager,
)


class GenerationService:

    def __init__(self):
        self.provider_manager = ProviderManager()

    async def generate_video(
        self,
        provider_name: str,
        payload: dict,
    ):
        return await self.provider_manager.generate(
            provider_name=provider_name,
            payload=payload,
        )