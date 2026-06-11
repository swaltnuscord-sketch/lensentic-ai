from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
)

from app.database.base import Base


class Shot(Base):
    __tablename__ = "shots"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    prompt = Column(Text, nullable=True)

    duration = Column(Integer, default=5)

    status = Column(String, default="pending")

    scene_id = Column(
        Integer,
        ForeignKey("scenes.id"),
    )