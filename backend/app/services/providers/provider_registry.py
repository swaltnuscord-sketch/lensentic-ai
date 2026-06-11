from app.services.providers.runway_provider import RunwayProvider


class ProviderRegistry:

    def __init__(self):
        self.providers = {
            "runway": RunwayProvider(),
        }

    def get_provider(self, provider_name: str):
        return self.providers.get(provider_name)


provider_registry = ProviderRegistry()