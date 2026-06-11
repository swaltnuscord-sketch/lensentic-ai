from abc import ABC, abstractmethod


class BaseAgent(ABC):

    def __init__(
        self,
        name: str,
        llm_service,
    ):
        self.name = name

        self.llm_service = llm_service

    @abstractmethod
    async def execute(
        self,
        state: dict,
    ):
        pass