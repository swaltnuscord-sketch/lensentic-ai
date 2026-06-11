from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "LensenticAI"

    APP_VERSION: str = "0.1.0"

    DEBUG: bool = True

    API_PREFIX: str = "/api"

    SECRET_KEY: str = "CHANGE_THIS_SECRET"

    DATABASE_URL: str = ""

    REDIS_URL: str = "redis://localhost:6379/0"

    STORAGE_MODE: str = "supabase"

    SUPABASE_URL: str = ""

    SUPABASE_KEY: str = ""

    SUPABASE_SERVICE_ROLE_KEY: str = ""

    SUPABASE_STORAGE_BUCKET: str = "lensenticai"

    FERNET_KEY: str = ""

    GEMINI_API_KEY: str = ""

    DEFAULT_LLM_PROViDER: str = "gemini"

    DEFAULT_LLM_MODEL: str = "gemini-2.5-flash"



    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    class Config:
        env_file = ".env"

settings = Settings()