from sqlalchemy.orm import Session

from fastapi import (
    APIRouter,
    Depends,
)

from app.database.session import SessionLocal

from app.database.models.shot import Shot

from app.schemas.shot_schema import (
    ShotCreate,
)

from app.api.dependencies.auth import (
    get_current_user,
)


router = APIRouter(
    prefix="/api/shots",
    tags=["Shots"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/{scene_id}")
async def create_shot(
    scene_id: int,
    payload: ShotCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    shot = Shot(
        title=payload.title,
        prompt=payload.prompt,
        duration=payload.duration,
        scene_id=scene_id,
    )

    db.add(shot)

    db.commit()

    db.refresh(shot)

    return shot


@router.get("/{scene_id}")
async def get_scene_shots(
    scene_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    shots = db.query(Shot).filter(
        Shot.scene_id == scene_id
    ).all()

    return shots