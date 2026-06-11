from app.services.orchestration.project_orchestrator import (
    ProjectOrchestrator,
)


class AgenticMoviePipeline:

    def __init__(self):
        self.orchestrator = (
            ProjectOrchestrator()
        )

    async def execute(
        self,
        project_id: str,
        raw_story: str,
    ):
        return await self.orchestrator.execute(
            project_id=project_id,
            raw_story=raw_story,
        )