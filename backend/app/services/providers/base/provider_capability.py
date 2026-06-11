from pydantic import BaseModel


class ProviderCapability(BaseModel):
    provider_name: str

    provider_type: str

    supports_text: bool = False

    supports_image: bool = False

    supports_video: bool = False

    supports_audio: bool = False

    supports_streaming: bool = False

    supports_async_generation: bool = False

    max_video_duration: int = 0

    quality_level: str = "standard"

    speed_level: str = "medium"

    cost_level: str = "medium"

    free_tier: bool = False

    user_pays_supported: bool = False