from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
)

from app.database.base import Base


class RenderJob(Base):
    __tablename__ = "render_jobs"

    id = Column(Integer, primary_key=True, index=True)

    provider = Column(String, nullable=False)

    status = Column(String, default="queued")

    prompt = Column(Text, nullable=True)

    output_url = Column(Text, nullable=True)

    shot_id = Column(
        Integer,
        ForeignKey("shots.id"),
    )