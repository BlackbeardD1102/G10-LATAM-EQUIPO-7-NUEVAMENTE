"""Schemas reutilizables en toda la API."""

from datetime import UTC, datetime
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field

T = TypeVar("T")


class BaseSchema(BaseModel):
    """Base común: serialización estricta y compatible con ORMs."""

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class ErrorDetail(BaseSchema):
    code: str = Field(description="Identificador estable del error.")
    message: str = Field(description="Mensaje legible para el cliente.")
    field: str | None = Field(
        default=None, description="Campo que originó el error, si aplica."
    )


class ErrorResponse(BaseSchema):
    """Cuerpo estándar para todas las respuestas de error."""

    detail: str
    errors: list[ErrorDetail] = Field(default_factory=list)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(UTC))


class Page(BaseSchema, Generic[T]):
    """Envoltura genérica para respuestas paginadas."""

    items: list[T]
    total: int = Field(ge=0)
    page: int = Field(ge=1)
    size: int = Field(ge=1)

    @property
    def pages(self) -> int:
        return (self.total + self.size - 1) // self.size if self.size else 0
