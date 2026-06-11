from pydantic import BaseModel


class RenderJobResponse(BaseModel):
    id: int
    provider: str
    status: str
    output_url: str | None = None

    class Config:
        from_attributes = True