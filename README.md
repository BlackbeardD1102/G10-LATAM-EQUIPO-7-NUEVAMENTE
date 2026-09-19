# G10 LATAM Equipo 7 — Backend

Backend construido con **FastAPI**, validación y configuración con **Pydantic v2**.

## Stack

| Capa | Paquete | Rol |
|---|---|---|
| Framework Web & API | `fastapi` | Framework ASGI y generación de OpenAPI |
| | `uvicorn[standard]` | Servidor ASGI de alto rendimiento |
| | `python-multipart` | Manejo de uploads (`multipart/form-data`) |
| | `python-dotenv` | Carga de variables desde `.env` |
| Validación & Tipado | `pydantic` v2 | Schemas, validación y serialización JSON |
| | `pydantic-settings` | Gestión tipada de configuración |

## Estructura

```
app/
├── main.py                     # create_app(), middleware, lifespan
├── core/
│   ├── config.py               # Settings (pydantic-settings)
│   ├── logging.py              # Configuración de logging
│   └── exceptions.py           # Handlers de error → ErrorResponse
├── api/v1/
│   ├── router.py               # Agrega los routers de la v1
│   └── endpoints/
│       ├── health.py           # GET /health
│       └── files.py            # POST /files/upload
├── schemas/                    # Modelos Pydantic (contratos de la API)
│   ├── common.py               # BaseSchema, ErrorResponse, Page[T]
│   ├── health.py
│   └── file.py
└── services/
    └── storage.py              # Guardado de archivos en disco
tests/                          # Suite con pytest + TestClient
```

La separación **endpoints → services → schemas** mantiene la lógica de negocio fuera de
la capa HTTP: cambiar el almacenamiento local por S3 solo toca `services/storage.py`.

## Puesta en marcha

```bash
# 1. Entorno virtual
python3 -m venv .venv
source .venv/bin/activate

# 2. Dependencias (usa requirements.txt para producción)
pip install -r requirements-dev.txt

# 3. Variables de entorno
cp .env.example .env

# 4. Levantar el servidor
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Documentación interactiva (Swagger UI): http://localhost:8000/docs

> La documentación y el esquema OpenAPI se deshabilitan automáticamente cuando
> `ENVIRONMENT=production`.

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Información del servicio |
| `GET` | `/api/v1/health` | Estado del servicio |
| `POST` | `/api/v1/files/upload` | Sube un archivo (`multipart/form-data`) |

## Configuración

Todas las variables viven en `.env` (ver `.env.example`). `BACKEND_CORS_ORIGINS`
acepta tanto una lista JSON como una cadena separada por comas.

## Tests y calidad

```bash
pytest                # Suite de tests
ruff check .          # Linter
ruff check --fix .    # Autocorrección
```

## Convenciones

- **Todas las respuestas de error** usan el schema `ErrorResponse`
  (`detail`, `errors[]`, `timestamp`), incluidos 404, 422 y 500.
- **Los schemas son el contrato**: cada endpoint declara `response_model`, lo que
  documenta la API y filtra automáticamente los campos de salida.
- **Nuevos módulos**: crear `app/api/v1/endpoints/<recurso>.py`, registrarlo en
  `app/api/v1/router.py` y añadir sus schemas en `app/schemas/`.

## Nota sobre versiones

El proyecto corre sobre Python 3.14, que requiere `pydantic>=2.12`
(las versiones anteriores no publican wheels para 3.14 y fallan al compilar).
