from pydantic import BaseModel


class SceneCreate(BaseModel):
    title: str
    description: str | None = None
    order: int = 0


class SceneResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    order: int

    class Config:
        from_attributes = True