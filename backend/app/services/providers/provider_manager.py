from app.services.providers.provider_registry import provider_registry


class ProviderManager:

    async def generate(
        self,
        provider_name: str,
        payload: dict,
    ):
        provider = provider_registry.get_provider(provider_name)

        if not provider:
            raise ValueError("Provider not found")

        return await provider.generate(payload)