from app.agents.base.base_agent import (
    BaseAgent,
)


class ScreenwriterAgent(BaseAgent):

    async def execute(
        self,
        state: dict,
    ):
        prompt = f"""
        Convert this story into a cinematic screenplay.

        Story Summary:
        {state['story_summary']}
        """

        response = await self.llm_service.generate(
            prompt
        )

        state["screenplay"] = response

        return state