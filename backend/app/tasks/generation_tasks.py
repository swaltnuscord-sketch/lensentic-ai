import time

from app.tasks.celery_worker import celery


@celery.task
def execute_render_generation(render_job_id: int):
    time.sleep(5)

    return {
        "render_job_id": render_job_id,
        "status": "completed",
    }