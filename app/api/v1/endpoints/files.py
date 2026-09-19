"""Endpoints de carga de archivos (requiere `python-multipart`)."""

from typing import Annotated

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.core.config import settings
from app.schemas.file import UploadedFile
from app.services.storage import FileTooLargeError, save_upload

router = APIRouter(prefix="/files", tags=["files"])


@router.post(
    "/upload",
    response_model=UploadedFile,
    status_code=status.HTTP_201_CREATED,
    summary="Subir un archivo",
)
async def upload_file(
    file: Annotated[UploadFile, File(description="Archivo a almacenar.")],
) -> UploadedFile:
    try:
        return await save_upload(file)
    except FileTooLargeError as exc:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"El archivo supera el máximo de {settings.MAX_UPLOAD_SIZE_MB} MB.",
        ) from exc
