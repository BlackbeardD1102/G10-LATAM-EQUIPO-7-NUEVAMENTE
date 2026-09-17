# 🎓 NuevaMente - Frontend (Flashcards Educativas con IA)

Este módulo corresponde al **Frontend interactivo** del proyecto **NuevaMente** (Hackathon ONE · Grupo 10). 
Desarrollado en **JavaScript moderno (ES6), HTML5 y CSS3** con diseño Glassmorphism y animaciones 3D.

---

## 🚀 Cómo Ejecutar el Frontend Localmente

Debido a que usamos módulos ES6 (`import { mockDatabase } from './mockData.js'`), los navegadores requieren que los archivos se sirvan a través de un servidor web local (por seguridad de CORS local).

Tienes cualquiera de estas 3 formas súper sencillas:

### Opción 1: Con Python (La más rápida si tienes Python instalado)
Abre una terminal en esta carpeta `frontend` y ejecuta:
```bash
python -m http.server 3000
```
Luego abre en tu navegador: [http://localhost:3000](http://localhost:3000)

### Opción 2: Con la extensión Live Server de VS Code
1. Abre la carpeta `frontend` en Visual Studio Code.
2. Haz clic derecho en `index.html`.
3. Selecciona **"Open with Live Server"**.

### Opción 3: Con Node / npx
```bash
npx serve .
```

---

## 🛠️ Características Implementadas

1. **Tarjetas 3D con Efecto Flip:**
   - Volteo suave con perspectiva 3D al hacer clic o al presionar la tecla **Espacio** / **Enter**.
   - Navegación entre tarjetas con botones o con las **flechas izquierda/derecha** del teclado.
2. **Modo Mock (Datos Simulados) vs Modo Backend Real:**
   - En la esquina superior derecha hay un selector:
     - **Modo Mock:** Funciona de inmediato sin necesidad de backend. Simula todo el pipeline de RAG y carga de IA con datos reales sobre IA, Ciencia de Datos y Desarrollo Web.
     - **Modo Backend Real:** Hace una petición `fetch(POST)` al endpoint `http://localhost:8000/api/adaptar` para conectarse a FastAPI.
3. **Pistas Didácticas y Metadatos:**
   - Muestra conceptos clave (#hashtags), tiempo de estudio, score de anclaje a fuentes y estado de subida a **OCI Object Storage**.

---

## 🤝 Contrato de Integración para el Equipo de Backend (Python / FastAPI)

Cuando el equipo de Backend tenga lista la API, solo deben asegurarse de cumplir este contrato:

- **Endpoint:** `POST http://localhost:8000/api/adaptar`
- **CORS Habilitado en FastAPI:**
  ```python
  from fastapi.middleware.cors import CORSMiddleware
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_methods=["*"],
      allow_headers=["*"],
  )
  ```
- **Esquema de Entrada (Request JSON):**
  ```json
  {
    "documento_titulo": "string",
    "documento_contenido": "string",
    "perfil_destinatario": "Principiante",
    "formato_salida": "Flashcards",
    "nicho_sector": "ia-principiante",
    "nivel_detalle": "Didactico"
  }
  ```
- **Esquema de Salida (Response JSON):**
  El JSON que figura en las páginas 4 y 5 del PDF del Hackathon (ver `mockData.js` como referencia).
