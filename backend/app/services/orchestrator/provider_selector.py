from app.services.providers.registry.provider_registry import (
    provider_registry,
)


class ProviderSelector:

    def select_video_provider(
        self,
        quality: str = "standard",
    ):
        if quality == "cinematic":
            return provider_registry.get_provider(
                "runway"
            )

        if quality == "draft":
            return provider_registry.get_provider(
                "ltx"
            )

        return provider_registry.get_provider(
            "kling"
        )

    def select_image_provider(self):
        return provider_registry.get_provider(
            "flux"
        )

    def select_audio_provider(self):
        return provider_registry.get_provider(
            "elevenlabs"
        )