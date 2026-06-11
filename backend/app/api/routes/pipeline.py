from fastapi import (
    APIRouter,
    Depends,
)

from app.api.dependencies.auth import (
    get_current_user,
)

from app.workflows.production.agentic_movie_pipeline import (
    AgenticMoviePipeline,
)


router = APIRouter(
    prefix="/api/pipeline",
    tags=["Pipeline"],
)


@router.post("/movie")
async def execute_movie_pipeline(
    payload: dict,
    current_user=Depends(get_current_user),
):
    pipeline = AgenticMoviePipeline()

    result = await pipeline.execute(
        project_id=str(
            payload.get(
                "project_id",
                "default-project",
            )
        ),
        raw_story=payload["story"],
    )

    return result