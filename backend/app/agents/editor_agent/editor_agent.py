from app.agents.base.base_agent import (
    BaseAgent,
)


class EditorAgent(BaseAgent):

    async def execute(
        self,
        state: dict,
    ):
        state["final_edit"] = {
            "timeline_ready": True,
            "shots_count": len(
                state.get("shots", [])
            ),
        }

        return state