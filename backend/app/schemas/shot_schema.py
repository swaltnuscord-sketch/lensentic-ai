from pydantic import BaseModel


class ShotCreate(BaseModel):
    title: str
    prompt: str
    duration: int = 5


class ShotResponse(BaseModel):
    id: int
    title: str
    prompt: str
    duration: int
    status: str

    class Config:
        from_attributes = True