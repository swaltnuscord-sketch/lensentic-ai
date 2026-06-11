from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, HTTPException

from app.database.session import SessionLocal
from app.database.models.user import User

from app.schemas.user_schema import (
    UserCreate,
    UserLogin,
)

from app.core.security import (
    hash_password,
    verify_password,
)

from app.auth.jwt_handler import create_access_token


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/register")
async def register_user(
    payload: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = db.query(User).filter(
        User.email == payload.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered",
        )

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    token = create_access_token(
        {"user_id": user.id, "email": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }


@router.post("/login")
async def login_user(
    payload: UserLogin,
    db: Session = Depends(get_db),
):
    user = db.query(User).filter(
        User.email == payload.email
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    valid = verify_password(
        payload.password,
        user.hashed_password,
    )

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
        )

    token = create_access_token(
        {"user_id": user.id, "email": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }