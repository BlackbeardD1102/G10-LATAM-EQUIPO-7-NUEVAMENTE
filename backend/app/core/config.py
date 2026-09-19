"""Configuración central de la aplicación.

Las variables se leen del entorno y del archivo `.env` (ver `.env.example`).
"""

import json
from functools import lru_cache
from typing import Annotated, Literal

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # --- Aplicación ---
    PROJECT_NAME: str = "NuevaMente API"
    DESCRIPTION: str = "Backend de NuevaMente — flashcards educativas con IA."
    VERSION: str = "0.1.0"
    ENVIRONMENT: Literal["local", "development", "staging", "production"] = "local"
    DEBUG: bool = True

    # --- API ---
    API_V1_PREFIX: str = "/api/v1"

    # --- Servidor ---
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # --- CORS ---
    # `NoDecode` evita que pydantic-settings intente parsear el valor como JSON
    # antes de tiempo, para poder aceptar también una cadena separada por comas.
    BACKEND_CORS_ORIGINS: Annotated[list[str], NoDecode] = Field(
        default_factory=lambda: ["http://localhost:3000"]
    )

    # --- Uploads ---
    MAX_UPLOAD_SIZE_MB: int = 10
    UPLOAD_DIR: str = "storage/uploads"

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def _parse_origins(cls, value: object) -> object:
        """Acepta una lista JSON (`["a","b"]`) o una cadena `a,b`."""
        if not isinstance(value, str):
            return value
        raw = value.strip()
        if raw.startswith("["):
            return json.loads(raw)
        return [origin.strip() for origin in raw.split(",") if origin.strip()]

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == "production"

    @property
    def max_upload_size_bytes(self) -> int:
        return self.MAX_UPLOAD_SIZE_MB * 1024 * 1024

    @property
    def docs_url(self) -> str | None:
        """La documentación interactiva se oculta en producción."""
        return None if self.is_production else "/docs"


@lru_cache
def get_settings() -> Settings:
    """Settings cacheados: se instancian una sola vez por proceso."""
    return Settings()


settings = get_settings()
