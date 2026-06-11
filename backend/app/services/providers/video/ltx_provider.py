from app.services.providers.base.base_provider import (
    BaseProvider,
)

from app.services.providers.base.provider_capability import (
    ProviderCapability,
)


class LTXProvider(BaseProvider):

    async def generate(
        self,
        payload: dict,
    ):
        return {
            "provider": "ltx",
            "status": "queued",
            "payload": payload,
        }

    def capabilities(self):
        return ProviderCapability(
            provider_name="ltx",
            provider_type="video",
            supports_video=True,
            supports_async_generation=True,
            max_video_duration=5,
            quality_level="draft",
            speed_level="fast",
            cost_level="low",
            free_tier=True,
            user_pays_supported=False,
        )