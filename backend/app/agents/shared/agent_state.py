from typing import TypedDict


class AgentState(TypedDict, total=False):
    raw_story: str

    story_summary: str

    screenplay: str

    scenes: list

    shots: list

    continuity_report: dict

    soundtrack_prompt: str

    visual_style: str

    timeline: dict

    final_edit: dict