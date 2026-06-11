from app.services.providers.video.runway_provider import (
    RunwayProvider,
)

from app.services.providers.video.kling_provider import (
    KlingProvider,
)

from app.services.providers.video.ltx_provider import (
    LTXProvider,
)

from app.services.providers.image.flux_provider import (
    FluxProvider,
)

from app.services.providers.audio.elevenlabs_provider import (
    ElevenLabsProvider,
)

from app.services.providers.text.openrouter_provider import (
    OpenRouterProvider,
)


class ProviderRegistry:

    def __init__(self):
        self.providers = {
            "runway": RunwayProvider(),
            "kling": KlingProvider(),
            "ltx": LTXProvider(),
            "flux": FluxProvider(),
            "elevenlabs": ElevenLabsProvider(),
            "openrouter": OpenRouterProvider(),
        }

    def get_provider(
        self,
        provider_name: str,
    ):
        return self.providers.get(provider_name)

    def get_capabilities(self):
        return {
            name: provider.capabilities().dict()
            for name, provider in self.providers.items()
        }


provider_registry = ProviderRegistry()