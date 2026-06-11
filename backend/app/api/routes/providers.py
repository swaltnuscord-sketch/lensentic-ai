from fastapi import APIRouter

from app.services.providers.registry.provider_registry import (
    provider_registry,
)


router = APIRouter(
    prefix="/api/providers",
    tags=["Providers"],
)


@router.get("/")
async def get_provider_capabilities():
    return provider_registry.get_capabilities()