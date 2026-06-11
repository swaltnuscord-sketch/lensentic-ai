from app.agents.base.base_agent import (
    BaseAgent,
)


class ProducerAgent(BaseAgent):

    async def execute(
        self,
        state: dict,
    ):
        prompt = f"""
        Analyze the following story and create a production overview.

        Story:
        {state['raw_story']}
        """

        response = await self.llm_service.generate(
            prompt
        )

        state["story_summary"] = response

        return state