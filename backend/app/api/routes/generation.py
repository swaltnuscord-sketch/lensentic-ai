from sqlalchemy.orm import Session

from fastapi import (
    APIRouter,
    Depends,
)

from app.database.session import SessionLocal

from app.database.models.render_job import (
    RenderJob,
)

from app.services.queue.render_queue_service import (
    RenderQueueService,
)

from app.api.dependencies.auth import (
    get_current_user,
)


router = APIRouter(
    prefix="/api/generation",
    tags=["Generation"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/video/{shot_id}")
async def generate_video(
    shot_id: int,
    payload: dict,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    render_job = RenderJob(
        provider=payload["provider"],
        prompt=payload["prompt"],
        shot_id=shot_id,
    )

    db.add(render_job)

    db.commit()

    db.refresh(render_job)

    queue_service = RenderQueueService()

    queue_service.queue_generation(
        render_job_id=render_job.id,
    )

    return {
        "status": "queued",
        "render_job_id": render_job.id,
    }


@router.get("/jobs")
async def get_render_jobs(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    jobs = db.query(RenderJob).all()

    return jobs