from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database.session import SessionLocal
from app.database.models.api_key import APIKey
from app.core.config import settings
from app.api.dependencies.auth import get_current_user
from app.services.api_key_service import APIKeyService

router = APIRouter(
    tags=["Provider API Keys"],
)

ENCRYPTION_KEY = settings.FERNET_KEY.encode() if isinstance(settings.FERNET_KEY, str) else settings.FERNET_KEY


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/status/{provider}")
async def get_provider_api_key_status(
    provider: str,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Check if an API key exists for a provider"""
    api_key = db.query(APIKey).filter(
        APIKey.user_id == current_user["user_id"],
        APIKey.provider == provider
    ).first()
    
    return {"status": api_key is not None}


@router.post("/set/{provider}")
async def set_provider_api_key(
    provider: str,
    payload: dict,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Set or update an API key for a provider"""
    service = APIKeyService(
        db=db,
        encryption_key=ENCRYPTION_KEY,
    )
    
    if not payload.get("key"):
        return {"error": "API key is required"}
    
    # Check if key already exists for this provider and user
    existing_key = db.query(APIKey).filter(
        APIKey.user_id == current_user["user_id"],
        APIKey.provider == provider
    ).first()
    
    if existing_key:
        # Update existing key
        existing_key.encrypted_key = service.encrypt_key(payload["key"])
        db.commit()
        db.refresh(existing_key)
        return {
            "id": existing_key.id,
            "provider": existing_key.provider,
            "message": "API key updated successfully"
        }
    else:
        # Create new key
        api_key = service.create_api_key(
            user_id=current_user["user_id"],
            provider=provider,
            raw_key=payload["key"],
        )
        return {
            "id": api_key.id,
            "provider": api_key.provider,
            "message": "API key created successfully"
        }
