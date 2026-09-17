/**
 * mockData.js
 * Datos simulados basados en el esquema JSON oficial del proyecto "NuevaMente".
 */

export const mockDatabase = {
  "ia-principiante": {
    "status": "exito",
    "metadatos": {
      "perfil_aplicado": "Principiante / Transición de Carrera",
      "formato_generado": "Flashcards",
      "tiempo_estimado_estudio_minutos": 6,
      "conceptos_clave": ["Machine Learning", "Prompt Engineering", "RAG", "Alucinaciones", "Embeddings"]
    },
    "contenido_adaptado": {
      "titulo": "Fundamentos y Concientización de Inteligencia Artificial",
      "introduccion_contextualizada": "La inteligencia artificial no es magia, es estadística avanzada aprendiendo de ejemplos pasados. Aquí tienes los conceptos clave para empezar sin fricción técnica.",
      "items": [
        {
          "frente": "¿Qué es el Machine Learning (Aprendizaje Automático)?",
          "dorso": "Es una rama de la IA donde no le damos reglas fijas a una máquina; en cambio, le mostramos miles de ejemplos (datos) para que aprenda a encontrar patrones por sí misma.",
          "pista_didactica": "Piensa en cómo aprendiste a distinguir un perro de un gato: viendo muchos ejemplos de niño."
        },
        {
          "frente": "¿Qué es una 'Alucinación' en los Modelos de Lenguaje (LLMs)?",
          "dorso": "Ocurre cuando la IA genera una respuesta que suena totalmente convincente, fluida y segura, pero que es fácticamente falsa o inventada.",
          "pista_didactica": "Nunca confíes a ciegas en un modelo sin verificar sus fuentes o usar sistemas como RAG."
        },
        {
          "frente": "¿Para qué sirve la técnica de RAG (Retrieval-Augmented Generation)?",
          "dorso": "Conecta el modelo de lenguaje a una base de datos o documentos reales antes de responder. Así la IA busca primero la información verídica y responde basándose estrictamente en ella.",
          "pista_didactica": "Es como rendir un examen a libro abierto en vez de responder de memoria."
        },
        {
          "frente": "¿Qué es un 'Embedding' en Inteligencia Artificial?",
          "dorso": "Es la traducción de palabras, frases o documentos a listas de números (vectores) matemáticos, permitiendo que la computadora entienda qué conceptos tienen significados similares.",
          "pista_didactica": "Conceptos relacionados quedan matemáticamente muy cerca en el espacio vectorial."
        }
      ]
    },
    "evaluacion_calidad": {
      "anclaje_fuente_score": 0.99,
      "claridad_pedagogica": "Alta",
      "observaciones": "Analogías claras, sin jerga matemática abrumadora, ideal para primer contacto."
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-contenidos-educativos",
      "objeto_id": "contenido-ia-principiante-flashcards-001.json",
      "status_upload": "completado"
    }
  },

  "datos-principiante": {
    "status": "exito",
    "metadatos": {
      "perfil_aplicado": "Principiante / Transición de Carrera",
      "formato_generado": "Flashcards",
      "tiempo_estimado_estudio_minutos": 5,
      "conceptos_clave": ["Ciencia de Datos", "Limpieza de Datos", "Sesgo Algorítmico", "Privacidad"]
    },
    "contenido_adaptado": {
      "titulo": "Ciencia de Datos y Ética: El Poder de la Información",
      "introduccion_contextualizada": "Los datos son el combustible del software moderno. Aprender a tratarlos con responsabilidad es vital para cualquier profesional de tecnología.",
      "items": [
        {
          "frente": "¿Cuál es el principio: 'Garbage In, Garbage Out'?",
          "dorso": "Si alimentas a un modelo o análisis con datos erróneos, incompletos o sucios, los resultados y conclusiones serán inevitablemente erróneos, sin importar la complejidad del algoritmo.",
          "pista_didactica": "La mayor parte del trabajo en datos consiste en limpiar y estructurar, no en entrenar modelos."
        },
        {
          "frente": "¿Qué es el 'Sesgo Algorítmico' en la toma de decisiones?",
          "dorso": "Es cuando un sistema automatizado replica o magnifica desigualdades humanas porque sus datos históricos de entrenamiento contenían esas mismas tendencias.",
          "pista_didactica": "Si un modelo se entrena solo con perfiles homogéneos, descartará patrones diversos."
        },
        {
          "frente": "¿Por qué es crítica la anonimización de datos?",
          "dorso": "Porque manejar datos personales sin enmascarar información sensible vulnera la privacidad de los usuarios y normativas legales vigentes.",
          "pista_didactica": "Nunca uses información personal real para pruebas o experimentación abierta."
        }
      ]
    },
    "evaluacion_calidad": {
      "anclaje_fuente_score": 0.97,
      "claridad_pedagogica": "Alta",
      "observaciones": "Enfoque reflexivo y formativo para concientización técnica."
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-contenidos-educativos",
      "objeto_id": "contenido-datos-etica-001.json",
      "status_upload": "completado"
    }
  },

  "web-principiante": {
    "status": "exito",
    "metadatos": {
      "perfil_aplicado": "Principiante",
      "formato_generado": "Flashcards",
      "tiempo_estimado_estudio_minutos": 5,
      "conceptos_clave": ["Frontend", "Backend", "API REST", "Cliente-Servidor"]
    },
    "contenido_adaptado": {
      "titulo": "La Arquitectura de la Web: Frontend vs Backend",
      "introduccion_contextualizada": "Toda aplicación moderna funciona bajo el modelo cliente-servidor, coordinando interfaz de usuario con servicios remotos.",
      "items": [
        {
          "frente": "¿Qué es el Frontend en una aplicación?",
          "dorso": "Es todo lo que el usuario ve y con lo que interactúa directamente en el navegador o app (interfaz visual, formularios, animaciones y navegación).",
          "pista_didactica": "En un servicio presencial, es la ventanilla de atención al público."
        },
        {
          "frente": "¿Qué es el Backend y cuál es su responsabilidad?",
          "dorso": "Es la capa lógica que corre en servidores remotos. Se encarga de procesar transacciones, reglas de negocio, bases de datos y seguridad.",
          "pista_didactica": "Es el centro de procesamiento y almacenamiento que opera detrás de la ventanilla."
        },
        {
          "frente": "¿Qué es una API REST y cómo conecta ambos extremos?",
          "dorso": "Es la interfaz de comunicación estructurada que permite al Frontend solicitar recursos al Backend y recibir respuestas en formatos estándar como JSON.",
          "pista_didactica": "Funciona como el protocolo formal de pedidos entre el cliente y el servidor."
        }
      ]
    },
    "evaluacion_calidad": {
      "anclaje_fuente_score": 0.98,
      "claridad_pedagogica": "Muy Alta",
      "observaciones": "Explicación clara de separación de responsabilidades sin tecnicismos superfluos."
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-contenidos-educativos",
      "objeto_id": "contenido-web-fundamentos-001.json",
      "status_upload": "completado"
    }
  }
};
