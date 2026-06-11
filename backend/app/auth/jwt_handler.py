from datetime import datetime, timedelta
from jose import jwt, JWTError

from app.core.config import settings


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = "HS256"


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(days=7)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return encoded_jwt


def verify_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        return payload

    except JWTError as e:
        print("JWT ERROR:", str(e))
        return None