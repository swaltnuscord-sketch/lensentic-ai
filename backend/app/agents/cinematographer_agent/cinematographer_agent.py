from app.agents.base.base_agent import (
    BaseAgent,
)


class CinematographerAgent(BaseAgent):

    async def execute(
        self,
        state: dict,
    ):
        prompt = f"""
        Create cinematic shot planning.

        Screenplay:
        {state['screenplay']}

        Visual Style:
        {state['visual_style']}
        """

        response = await self.llm_service.generate(
            prompt
        )

        state["shots"] = [response]

        return state