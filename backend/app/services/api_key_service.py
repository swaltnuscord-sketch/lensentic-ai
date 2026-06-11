from cryptography.fernet import Fernet

from app.database.models.api_key import APIKey


class APIKeyService:

    def __init__(self, db, encryption_key: bytes):
        self.db = db
        self.fernet = Fernet(encryption_key)

    def encrypt_key(self, raw_key: str):
        return self.fernet.encrypt(raw_key.encode()).decode()

    def decrypt_key(self, encrypted_key: str):
        return self.fernet.decrypt(
            encrypted_key.encode()
        ).decode()

    def create_api_key(
        self,
        user_id: int,
        provider: str,
        raw_key: str,
    ):
        encrypted_key = self.encrypt_key(raw_key)

        api_key = APIKey(
            provider=provider,
            encrypted_key=encrypted_key,
            user_id=user_id,
        )

        self.db.add(api_key)

        self.db.commit()

        self.db.refresh(api_key)

        return api_key