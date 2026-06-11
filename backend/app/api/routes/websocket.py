from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from app.websocket.connection_manager import (
    manager,
)


router = APIRouter(tags=["WebSocket"])


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)

    try:
        while True:
            data = await websocket.receive_text()

            await manager.broadcast(
                {
                    "message": data,
                }
            )

    except WebSocketDisconnect:
        manager.disconnect(websocket)