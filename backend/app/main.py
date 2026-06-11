from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware,
)

from app.core.config import settings

from app.api.routes import (
    health,
    auth,
    projects,
    api_keys,
    provider_keys,
    websocket,
    scenes,
    shots,
    generation,
    uploads,
    pipeline,
    providers,
)

from app.database.base import Base

from app.database.session import engine


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)

app.include_router(auth.router)

app.include_router(projects.router)

app.include_router(api_keys.router)

app.include_router(provider_keys.router)

app.include_router(websocket.router)

app.include_router(scenes.router)

app.include_router(shots.router)

app.include_router(generation.router)

app.include_router(uploads.router)

app.include_router(pipeline.router)

app.include_router(providers.router)


@app.get("/")
async def root():
    return {
        "message": "LensenticAI Backend Online",
        "version": settings.APP_VERSION,
        "status": "operational",
    }