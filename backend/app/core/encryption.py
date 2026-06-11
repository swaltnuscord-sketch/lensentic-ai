from cryptography.fernet import Fernet


class EncryptionManager:
    def __init__(self, secret_key: bytes):
        self.fernet = Fernet(secret_key)

    def encrypt(self, value: str) -> str:
        return self.fernet.encrypt(value.encode()).decode()

    def decrypt(self, value: str) -> str:
        return self.fernet.decrypt(value.encode()).decode()