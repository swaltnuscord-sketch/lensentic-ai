from app.services.providers.base.base_provider import (
    BaseProvider,
)

from app.services.providers.base.provider_capability import (
    ProviderCapability,
)


class FluxProvider(BaseProvider):

    async def generate(
        self,
        payload: dict,
    ):
        return {
            "provider": "flux",
            "status": "completed",
            "payload": payload,
        }

    def capabilities(self):
        return ProviderCapability(
            provider_name="flux",
            provider_type="image",
            supports_image=True,
            quality_level="high",
            speed_level="fast",
            cost_level="low",
            free_tier=True,
            user_pays_supported=True,
        )