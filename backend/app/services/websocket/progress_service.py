from app.websocket.connection_manager import (
    manager,
)


class ProgressService:

    async def send_progress(
        self,
        message: str,
        progress: int,
    ):
        await manager.broadcast(
            {
                "message": message,
                "progress": progress,
            }
        )