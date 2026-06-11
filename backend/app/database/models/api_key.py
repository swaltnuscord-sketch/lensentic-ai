from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
)

from app.database.base import Base


class APIKey(Base):
    __tablename__ = "api_keys"

    id = Column(Integer, primary_key=True, index=True)

    provider = Column(String, nullable=False)

    encrypted_key = Column(String, nullable=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
    )   