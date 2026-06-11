from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
)

from app.database.base import Base


class Scene(Base):
    __tablename__ = "scenes"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text, nullable=True)

    order = Column(Integer, default=0)

    project_id = Column(
        Integer,
        ForeignKey("projects.id"),
    )