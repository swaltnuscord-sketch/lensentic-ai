from app.services.providers.base.base_provider import (
    BaseProvider,
)

from app.services.providers.base.provider_capability import (
    ProviderCapability,
)


class OpenRouterProvider(BaseProvider):

    async def generate(
        self,
        payload: dict,
    ):
        return {
            "provider": "openrouter",
            "status": "completed",
            "payload": payload,
        }

    def capabilities(self):
        return ProviderCapability(
            provider_name="openrouter",
            provider_type="text",
            supports_text=True,
            supports_streaming=True,
            quality_level="high",
            speed_level="fast",
            cost_level="low",
            free_tier=True,
            user_pays_supported=True,
        )