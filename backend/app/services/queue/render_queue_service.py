from app.tasks.generation_tasks import (
    execute_render_generation,
)


class RenderQueueService:

    def queue_generation(
        self,
        render_job_id: int,
    ):
        execute_render_generation.delay(
            render_job_id
        )

        return {
            "status": "queued",
            "render_job_id": render_job_id,
        }