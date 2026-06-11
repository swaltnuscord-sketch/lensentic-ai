from app.core.config import settings

from app.services.storage.local_storage import (
    LocalStorageService,
)

from app.services.storage.supabase_storage import (
    SupabaseStorageService,
)


class UploadService:

    def __init__(self):

        if settings.STORAGE_MODE == "supabase":
            self.storage = SupabaseStorageService()

        else:
            self.storage = LocalStorageService()

    def upload_file(
        self,
        file_bytes,
        filename,
    ):
        return self.storage.upload_file(
            file_bytes=file_bytes,
            filename=filename,
        )