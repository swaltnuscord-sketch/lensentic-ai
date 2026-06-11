from app.agents.base.base_agent import (
    BaseAgent,
)


class DirectorAgent(BaseAgent):

    async def execute(
        self,
        state: dict,
    ):
        prompt = f"""
        Create a cinematic directing vision for this story.

        Story Summary:
        {state['story_summary']}
        """

        response = await self.llm_service.generate(
            prompt
        )

        state["visual_style"] = response

        return state