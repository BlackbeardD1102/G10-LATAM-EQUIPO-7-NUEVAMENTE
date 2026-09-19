"""Schemas del endpoint de salud."""

from datetime import UTC, datetime
from typing import Literal

from pydantic import Field

from app.schemas.common import BaseSchema


class HealthResponse(BaseSchema):
    status: Literal["ok", "degraded"] = "ok"
    service: str
    version: str
    environment: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(UTC))
