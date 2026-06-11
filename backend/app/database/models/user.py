from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False)

    hashed_password = Column(String, nullable=False)

    api_keys = relationship(
        "APIKey",
        backref="user",
        cascade="all, delete",
    )