from fastapi import (
    APIRouter,
    UploadFile,
    File,
)

from app.services.uploads.upload_service import (
    UploadService,
)


router = APIRouter(
    prefix="/api/uploads",
    tags=["Uploads"],
)


@router.post("/")
async def upload_file(
    file: UploadFile = File(...),
):
    service = UploadService()

    file_bytes = await file.read()

    uploaded = service.upload_file(
        file_bytes=file_bytes,
        filename=file.filename,
    )

    return {
        "status": "uploaded",
        "file": uploaded,
    }