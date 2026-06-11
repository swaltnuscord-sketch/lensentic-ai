from app.agents.base.base_agent import (
    BaseAgent,
)


class SoundtrackAgent(BaseAgent):

    async def execute(
        self,
        state: dict,
    ):
        prompt = f"""
        Create soundtrack direction for this film.

        Story Summary:
        {state['story_summary']}
        """

        response = await self.llm_service.generate(
            prompt
        )

        state["soundtrack_prompt"] = response

        return state