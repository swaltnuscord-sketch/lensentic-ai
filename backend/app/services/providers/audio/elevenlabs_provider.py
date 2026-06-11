from app.services.providers.base.base_provider import (
    BaseProvider,
)

from app.services.providers.base.provider_capability import (
    ProviderCapability,
)


class ElevenLabsProvider(BaseProvider):

    async def generate(
        self,
        payload: dict,
    ):
        return {
            "provider": "elevenlabs",
            "status": "completed",
            "payload": payload,
        }

    def capabilities(self):
        return ProviderCapability(
            provider_name="elevenlabs",
            provider_type="audio",
            supports_audio=True,
            quality_level="cinematic",
            speed_level="fast",
            cost_level="high",
            free_tier=False,
            user_pays_supported=True,
        )