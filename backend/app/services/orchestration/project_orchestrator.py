from app.services.llm.llm_service import (
    LLMService,
)

from app.agents.producer_agent.producer_agent import (
    ProducerAgent,
)

from app.agents.director_agent.director_agent import (
    DirectorAgent,
)

from app.agents.screenwriter_agent.screenwriter_agent import (
    ScreenwriterAgent,
)

from app.agents.cinematographer_agent.cinematographer_agent import (
    CinematographerAgent,
)

from app.agents.continuity_agent.continuity_agent import (
    ContinuityAgent,
)

from app.agents.soundtrack_agent.soundtrack_agent import (
    SoundtrackAgent,
)

from app.agents.editor_agent.editor_agent import (
    EditorAgent,
)

from app.services.memory.project_memory.project_memory_service import (
    ProjectMemoryService,
)


class ProjectOrchestrator:

    def __init__(self):
        self.llm_service = LLMService()

        self.memory = ProjectMemoryService()

        self.agents = [
            ProducerAgent(
                "ProducerAgent",
                self.llm_service,
            ),
            DirectorAgent(
                "DirectorAgent",
                self.llm_service,
            ),
            ScreenwriterAgent(
                "ScreenwriterAgent",
                self.llm_service,
            ),
            CinematographerAgent(
                "CinematographerAgent",
                self.llm_service,
            ),
            ContinuityAgent(
                "ContinuityAgent",
                self.llm_service,
            ),
            SoundtrackAgent(
                "SoundtrackAgent",
                self.llm_service,
            ),
            EditorAgent(
                "EditorAgent",
                self.llm_service,
            ),
        ]

    async def execute(
        self,
        project_id: str,
        raw_story: str,
        
    ):
        state = {
            "raw_story": raw_story
        }

        for agent in self.agents:
            state = await agent.execute(
                state
            )

        self.memory.save(
            project_id,
            state,
        )

        return state