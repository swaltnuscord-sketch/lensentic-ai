from uuid import uuid4

from supabase import create_client

from app.core.config import settings


class SupabaseStorageService:

    def __init__(self):
        self.client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SERVICE_ROLE_KEY,
        )

        self.bucket = settings.SUPABASE_STORAGE_BUCKET

    def upload_file(
        self,
        file_bytes: bytes,
        filename: str,
    ):
        generated_name = f"{uuid4()}_{filename}"

        self.client.storage.from_(self.bucket).upload(
            path=generated_name,
            file=file_bytes,
            file_options={
                "content-type": "application/octet-stream"
            },
        )

        public_url = self.client.storage.from_(
            self.bucket
        ).get_public_url(generated_name)

        return {
            "filename": generated_name,
            "url": public_url,
        }