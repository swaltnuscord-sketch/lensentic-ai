from pathlib import Path

from uuid import uuid4


class LocalStorageService:

    BASE_UPLOAD_DIR = "app/storage/local/uploads"

    def upload_file(
        self,
        file_bytes: bytes,
        filename: str,
    ):
        extension = filename.split(".")[-1]

        generated_name = f"{uuid4()}.{extension}"

        output_path = Path(
            self.BASE_UPLOAD_DIR
        ) / generated_name

        output_path.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        with open(output_path, "wb") as file:
            file.write(file_bytes)

        return {
            "filename": generated_name,
            "url": str(output_path),
        }