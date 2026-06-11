from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends

from app.database.session import SessionLocal
from app.database.models.project import Project

from app.schemas.project_schema import (
    ProjectCreate,
)

from app.api.dependencies.auth import (
    get_current_user,
)


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/")
async def create_project(
    payload: ProjectCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = Project(
        title=payload.title,
        description=payload.description,
        owner_id=current_user["user_id"],
    )

    db.add(project)

    db.commit()

    db.refresh(project)

    return project


@router.get("/")
async def get_projects(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    projects = db.query(Project).filter(
        Project.owner_id == current_user["user_id"]
    ).all()

    return projects