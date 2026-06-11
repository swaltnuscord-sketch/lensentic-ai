from app.agents.base.base_agent import (
    BaseAgent,
)


class ContinuityAgent(BaseAgent):

    async def execute(
        self,
        state: dict,
    ):
        prompt = f"""
        Validate continuity consistency.

        Screenplay:
        {state['screenplay']}

        Shots:
        {state['shots']}
        """

        response = await self.llm_service.generate(
            prompt
        )

        state["continuity_report"] = {
            "report": response
        }

        return state