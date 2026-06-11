from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends

from app.database.session import SessionLocal

from app.database.models.api_key import APIKey

from app.core.config import settings

from app.api.dependencies.auth import (
    get_current_user,
)

from app.services.api_key_service import (
    APIKeyService,
)


router = APIRouter(
    prefix="/api/api-keys",
    tags=["API Keys"],
)


ENCRYPTION_KEY = settings.FERNET_KEY.encode() if isinstance(settings.FERNET_KEY, str) else settings.FERNET_KEY


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/")
async def create_api_key(
    payload: dict,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    service = APIKeyService(
        db=db,
        encryption_key=ENCRYPTION_KEY,
    )

    api_key = service.create_api_key(
        user_id=current_user["user_id"],
        provider=payload["provider"],
        raw_key=payload["api_key"],
    )

    return {
        "id": api_key.id,
        "provider": api_key.provider,
    }


@router.get("/")
async def get_api_keys(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    api_keys = db.query(APIKey).filter(
        APIKey.user_id == current_user["user_id"]
    ).all()

    return [
        {
            "id": item.id,
            "provider": item.provider,
        }
        for item in api_keys
    ]