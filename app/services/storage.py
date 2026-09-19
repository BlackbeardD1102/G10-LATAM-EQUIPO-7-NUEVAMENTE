"""Almacenamiento de archivos en disco local.

Aislado como servicio para poder sustituirlo por S3/GCS sin tocar los endpoints.
"""

from __future__ import annotations

import re
import uuid
from pathlib import Path

from fastapi import UploadFile

from app.core.config import settings
from app.schemas.file import UploadedFile

_UNSAFE_CHARS = re.compile(r"[^A-Za-z0-9._-]+")
_CHUNK_SIZE = 1024 * 1024  # 1 MiB


class FileTooLargeError(Exception):
    """El archivo excede `MAX_UPLOAD_SIZE_MB`."""


def sanitize_filename(filename: str) -> str:
    """Devuelve un nombre seguro, sin rutas ni caracteres especiales."""
    stem = Path(filename or "archivo").name
    safe = _UNSAFE_CHARS.sub("_", stem).strip("._-")
    return safe or "archivo"


def upload_dir() -> Path:
    path = Path(settings.UPLOAD_DIR)
    path.mkdir(parents=True, exist_ok=True)
    return path


async def save_upload(file: UploadFile) -> UploadedFile:
    """Guarda el archivo por chunks y aborta si supera el tamaño máximo."""
    original = file.filename or "archivo"
    safe_name = f"{uuid.uuid4().hex}_{sanitize_filename(original)}"
    destination = upload_dir() / safe_name

    size = 0
    try:
        with destination.open("wb") as buffer:
            while chunk := await file.read(_CHUNK_SIZE):
                size += len(chunk)
                if size > settings.max_upload_size_bytes:
                    raise FileTooLargeError(original)
                buffer.write(chunk)
    except BaseException:
        destination.unlink(missing_ok=True)
        raise
    finally:
        await file.close()

    return UploadedFile(
        filename=safe_name,
        original_filename=original,
        content_type=file.content_type,
        size_bytes=size,
        path=str(destination),
    )
