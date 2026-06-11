from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
)

from app.database.base import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    description = Column(Text, nullable=True)

    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
    )