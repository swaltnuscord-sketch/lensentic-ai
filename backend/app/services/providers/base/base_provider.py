from abc import ABC, abstractmethod


class BaseProvider(ABC):

    @abstractmethod
    async def generate(self, payload: dict):
        pass

    @abstractmethod
    def capabilities(self):
        pass