from app.services.providers.base_provider import BaseProvider


class RunwayProvider(BaseProvider):

    async def generate(self, payload: dict):
        return {
            "provider": "runway",
            "status": "queued",
            "payload": payload,
        }