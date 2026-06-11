from sqlalchemy.orm import Session

from fastapi import (
    APIRouter,
    Depends,
)

from app.database.session import SessionLocal

from app.database.models.scene import Scene

from app.schemas.scene_schema import (
    SceneCreate,
)

from app.api.dependencies.auth import (
    get_current_user,
)


router = APIRouter(
    prefix="/api/scenes",
    tags=["Scenes"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/{project_id}")
async def create_scene(
    project_id: int,
    payload: SceneCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    scene = Scene(
        title=payload.title,
        description=payload.description,
        order=payload.order,
        project_id=project_id,
    )

    db.add(scene)

    db.commit()

    db.refresh(scene)

    return scene


@router.get("/{project_id}")
async def get_project_scenes(
    project_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    scenes = db.query(Scene).filter(
        Scene.project_id == project_id
    ).all()

    return scenes