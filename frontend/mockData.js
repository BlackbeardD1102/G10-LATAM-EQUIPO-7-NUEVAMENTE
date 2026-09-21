/**
 * mockData.js
 * Banco de contenidos multi-formato para los 5 Pilares del Desarrollo Moderno.
 * Soporta: Flashcards, Síntesis RAG (Resúmenes ejecutivos), Video/Guion didáctico y Quiz interactivo.
 */

export const mockDatabase = {
  "backend": {
    "titulo": "Pilar 1: Arquitectura Backend & Servidores",
    "metadatos": {
      "tiempo_estudio": "6 min",
      "anclaje_rag": 99,
      "fidelidad": "Alta"
    },
    "flashcards": [
      {
        "frente": "¿Cuál es la función principal de un Load Balancer (Balanceador de Carga)?",
        "dorso": "Distribuye el tráfico entrante de los usuarios equitativamente entre varios servidores web para evitar que uno solo se sature y caiga el servicio.",
        "pista_didactica": "Funciona como un recepcionista en un banco que envía a cada cliente a la ventanilla que está libre."
      },
      {
        "frente": "¿Qué diferencia a una Base de Datos Relacional (SQL)?",
        "dorso": "Almacena los datos en tablas estructuradas con filas y columnas con esquemas rígidos y relaciones formales mediante claves primarias y foráneas.",
        "pista_didactica": "Piensa en un libro de Excel con hojas interconectadas entre sí de forma estricta."
      },
      {
        "frente": "¿Qué es un Endpoint en una REST API?",
        "dorso": "Es una dirección URL específica a la que el frontend envía una solicitud (GET, POST, PUT, DELETE) para consultar o modificar datos en el servidor.",
        "pista_didactica": "Es como el número de interno o buzón exacto de un departamento al que envías tu carta."
      },
      {
        "frente": "¿Por qué se utiliza Node.js para servicios web en tiempo real?",
        "dorso": "Porque funciona con un modelo asíncrono y no bloqueante impulsado por eventos (Event Loop), ideal para manejar miles de conexiones simultáneas.",
        "pista_didactica": "Como un camarero que toma pedidos de muchas mesas sin esperar a que la cocina termine un plato para atender al siguiente."
      }
    ],
    "sintesis": {
      "resumen_ejecutivo": "La arquitectura de backend moderna desacopla la capa de presentación mediante APIs REST. Los servidores web se escalan horizontalmente detrás de balanceadores de carga para garantizar alta disponibilidad, mientras que la persistencia se gestiona con bases de datos relacionales o no relacionales según los patrones de lectura y escritura.",
      "puntos_clave": [
        "Separación estricta entre capa de presentación y lógica de negocio.",
        "Manejo de concurrencia mediante arquitecturas basadas en eventos (Event-Driven).",
        "Diseño de esquemas y normalización para garantizar integridad de datos (ACID)."
      ],
      "terminos_clave": ["Load Balancer", "Reverse Proxy", "REST API", "ORM", "Connection Pooling"]
    },
    "video": {
      "titulo_video": "Masterclass: Cómo escala un Backend de 0 a 1M de usuarios",
      "duracion": "4:30 min",
      "puntos_video": [
        "Min 0:30 - El cuello de botella del servidor único.",
        "Min 1:45 - Cómo opera el Balanceador de Carga en Layer 7.",
        "Min 3:10 - Caché en memoria (Redis) para liberar a la base de datos."
      ]
    },
    "quiz": {
      "pregunta": "Si un servidor web experimenta un pico repentino de tráfico de 50,000 usuarios concurrentes, ¿cuál es la mejor solución de arquitectura inmediata?",
      "opciones": [
        "Aumentar el tamaño de la memoria RAM del servidor único indefinidamente.",
        "Incorporar un Load Balancer que distribuya la carga entre múltiples instancias réplicas.",
        "Eliminar todas las validaciones de datos en los endpoints de la API.",
        "Mudar toda la lógica del servidor al navegador del cliente."
      ],
      "correcta": 1,
      "explicacion": "El escalado horizontal con un Load Balancer permite sumar nuevas instancias de servidores según la demanda sin tener un único punto de falla."
    }
  },

  "frontend": {
    "titulo": "Pilar 2: Frontend & Experiencia de Usuario",
    "metadatos": {
      "tiempo_estudio": "5 min",
      "anclaje_rag": 98,
      "fidelidad": "Alta"
    },
    "flashcards": [
      {
        "frente": "¿Qué significa el enfoque de diseño 'Mobile-First'?",
        "dorso": "Diseñar y maquetar primero para pantallas móviles pequeñas y luego expandir la interfaz progresivamente hacia tablets y monitores de escritorio.",
        "pista_didactica": "Empieza metiendo lo esencial en una valija pequeña; si cabe ahí, sobrará espacio en una grande."
      },
      {
        "frente": "¿Qué es un 'Componente' en librerías modernas como React?",
        "dorso": "Es una pieza de interfaz reutilizable e independiente que encapsula su propia estructura (HTML), estilo (CSS) y lógica (JS).",
        "pista_didactica": "Bloques de Lego: armas botones o tarjetas una sola vez y los reutilizas por toda la app."
      },
      {
        "frente": "¿Para qué sirve CSS Flexbox y Grid en maquetación?",
        "dorso": "Permiten distribuir, alinear y ordenar elementos en la pantalla de forma fluida y automática sin importar la resolución del dispositivo.",
        "pista_didactica": "Flexbox organiza en una dimensión (filas o columnas); Grid organiza en dos dimensiones (cuadrícula completa)."
      }
    ],
    "sintesis": {
      "resumen_ejecutivo": "El Frontend moderno se construye mediante arquitecturas orientadas a componentes. La interfaz se concibe desde el paradigma Mobile-First garantizando rendimiento óptimo, accesibilidad web (a11y) y reactividad en tiempo real sincronizada con el estado de la aplicación.",
      "puntos_clave": [
        "Ecosistema declarativo y reactivo basado en Single Page Applications (SPA).",
        "Sistemas de diseño modulares con reutilización de componentes UI.",
        "Optimización de Core Web Vitals (tiempo de carga, interactividad y estabilidad visual)."
      ],
      "terminos_clave": ["Mobile-First", "Virtual DOM", "CSS Grid", "State Management", "Responsiveness"]
    },
    "video": {
      "titulo_video": "Arquitectura de Componentes y Mobile-First en Acción",
      "duracion": "3:50 min",
      "puntos_video": [
        "Min 0:40 - Deconstruyendo un diseño complejo en componentes atómicos.",
        "Min 1:55 - Flexbox vs Grid: cuándo usar cada uno en producción.",
        "Min 3:00 - Gestión de estado y flujo unidireccional de datos."
      ]
    },
    "quiz": {
      "pregunta": "¿Por qué se recomienda la metodología 'Mobile-First' en el diseño de interfaces?",
      "opciones": [
        "Porque obliga a priorizar el contenido esencial y mejora los tiempos de carga en redes móviles.",
        "Porque anula la necesidad de escribir código CSS para pantallas de computadoras.",
        "Porque impide que los usuarios de computadoras puedan usar la aplicación.",
        "Porque solo se puede programar en JavaScript si se hace en móviles."
      ],
      "correcta": 0,
      "explicacion": "Diseñar primero para móviles te fuerza a priorizar el contenido más importante y asegura una experiencia ágil con recursos limitados."
    }
  },

  "datascience": {
    "titulo": "Pilar 3: Ciencia de Datos & Pipelines",
    "metadatos": {
      "tiempo_estudio": "6 min",
      "anclaje_rag": 99,
      "fidelidad": "Muy Alta"
    },
    "flashcards": [
      {
        "frente": "¿Cuáles son las 4 etapas de un 'Big Data Pipeline'?",
        "dorso": "1. Ingest (recolección de fuentes), 2. Clean (limpieza y descarte de ruido), 3. Analyze (análisis y modelos), 4. Store (almacenamiento seguro).",
        "pista_didactica": "Es como el tratamiento del agua: se extrae del río, se purifica, se comprueba su calidad y se almacena en el tanque."
      },
      {
        "frente": "¿Por qué la etapa de 'Limpieza de Datos' consume el 80% del tiempo?",
        "dorso": "Porque los datos reales vienen con valores nulos, duplicados, errores tipográficos o inconsistencias que arruinarían cualquier modelo.",
        "pista_didactica": "Si cocinas con ingredientes vencidos o sucios, el plato final será incomible sin importar la receta."
      },
      {
        "frente": "¿Qué analiza una Regresión Lineal en Ciencia de Datos?",
        "dorso": "Modela la relación entre una variable independiente y una dependiente para predecir tendencias numéricas futuras a partir de una línea de tendencia.",
        "pista_didactica": "A más horas de estudio (X), mayor nota esperada en el examen (Y)."
      }
    ],
    "sintesis": {
      "resumen_ejecutivo": "Los pipelines de datos automatizan el flujo desde fuentes heterogéneas hasta almacenes analíticos. La calidad y gobernanza del dato determinan el éxito de cualquier modelo predictivo o tablero de inteligencia de negocios (BI).",
      "puntos_clave": [
        "Etapas secuenciales de extracción, transformación y carga (ETL/ELT).",
        "Estandarización, imputación de valores faltantes y eliminación de outliers.",
        "Visualización analítica mediante dashboards interactivos para toma de decisiones."
      ],
      "terminos_clave": ["Data Ingestion", "Data Wrangling", "ETL/ELT", "Outliers", "Feature Engineering"]
    },
    "video": {
      "titulo_video": "Construyendo un Pipeline de Datos Robusto paso a paso",
      "duracion": "5:15 min",
      "puntos_video": [
        "Min 1:00 - De fuentes dispersas (APIs, SQL, Logs) al lago de datos.",
        "Min 2:30 - Automatización de limpieza de datos con Pandas y SQL.",
        "Min 4:10 - Creación de tableros ejecutivos de métricas clave."
      ]
    },
    "quiz": {
      "pregunta": "¿Qué consecuencia directa tiene entrenar un modelo analítico sin realizar una limpieza previa de datos?",
      "opciones": [
        "El modelo aprenderá de sesgos y ruido produciendo conclusiones totalmente erróneas ('Garbage in, garbage out').",
        "El modelo aumentará automáticamente su precisión al 100%.",
        "El servidor de base de datos se convertirá automáticamente en un sistema NoSQL.",
        "No tiene ningún impacto porque los algoritmos corrigen los datos sucios solos."
      ],
      "correcta": 0,
      "explicacion": "El principio 'Garbage In, Garbage Out' dicta que si alimentas a un modelo con datos defectuosos, sus predicciones serán defectuosas."
    }
  },

  "ia": {
    "titulo": "Pilar 4: Inteligencia Artificial & Redes Neuronales",
    "metadatos": {
      "tiempo_estudio": "7 min",
      "anclaje_rag": 99,
      "fidelidad": "Alta"
    },
    "flashcards": [
      {
        "frente": "¿Cómo funciona una Red Neuronal Artificial (Inputs, Hidden Layers, Output)?",
        "dorso": "Recibe datos crudos en los inputs, los procesa a través de capas ocultas ajustando pesos matemáticos, y entrega una predicción o resultado en la capa de salida.",
        "pista_didactica": "Como un jurado de expertos deliberando: cada capa afina el veredicto antes de dar el veredicto final."
      },
      {
        "frente": "¿Qué es la técnica RAG (Retrieval-Augmented Generation)?",
        "dorso": "Busca información verídica en una base de datos de documentos técnicos antes de que el LLM responda, evitando que invente o alucine respuestas.",
        "pista_didactica": "Es como consultar el manual antes de responder en vez de contestar por intuición."
      },
      {
        "frente": "¿Qué diferencia hay entre Algoritmos de Clasificación y Clustering?",
        "dorso": "La Clasificación (Supervisada) asigna datos a etiquetas conocidas; el Clustering (No Supervisado) agrupa datos similares sin etiquetas previas.",
        "pista_didactica": "Clasificar es separar correos en 'Spam' o 'No Spam'; Clustering es agrupar clientes por patrones de compra desconocidos."
      }
    ],
    "sintesis": {
      "resumen_ejecutivo": "Las redes neuronales profundas (Deep Learning) aprenden representaciones jerárquicas de datos complejos. En el ecosistema de IA generativa moderno, técnicas como RAG (Retrieval-Augmented Generation) y orquestación multiagente son indispensables para mitigar alucinaciones y fundamentar respuestas en documentación técnica fehaciente.",
      "puntos_clave": [
        "Ajuste de pesos mediante backpropagation y funciones de activación.",
        "Vector Stores (ChromaDB) y generación de embeddings para búsqueda semántica.",
        "Validación y supervisión pedagógica mediante agentes críticos."
      ],
      "terminos_clave": ["Hidden Layers", "Embeddings", "RAG", "Vector Store", "Alucinaciones"]
    },
    "video": {
      "titulo_video": "De Neuronas Artificiales a Modelos RAG y Agentes Autónomos",
      "duracion": "4:45 min",
      "puntos_video": [
        "Min 0:50 - Visualizando el flujo de datos a través de capas neuronales.",
        "Min 2:15 - Cómo funciona la búsqueda vectorial y el anclaje RAG.",
        "Min 3:40 - Multiagente: Agente Generador vs Agente Revisor."
      ]
    },
    "quiz": {
      "pregunta": "¿Cuál es la principal ventaja de utilizar un pipeline de RAG frente a consultar directamente a un LLM estándar?",
      "opciones": [
        "RAG ancla las respuestas en documentos técnicos reales de la empresa, reduciendo drásticamente las alucinaciones.",
        "RAG permite que el modelo funcione sin necesidad de usar electricidad.",
        "RAG reemplaza por completo el uso de cualquier modelo de lenguaje.",
        "RAG hace que las consultas sean 100 veces más lentas a propósito."
      ],
      "correcta": 0,
      "explicacion": "RAG recupera primero fragmentos exactos de la documentación técnica oficial antes de generar la respuesta, garantizando rigor y veracidad."
    }
  },

  "devops": {
    "titulo": "Pilar 5: DevOps & Nube con OCI",
    "metadatos": {
      "tiempo_estudio": "6 min",
      "anclaje_rag": 99,
      "fidelidad": "Alta"
    },
    "flashcards": [
      {
        "frente": "¿Qué es el ciclo de CI/CD (Code -> Build -> Test -> Deploy)?",
        "dorso": "Un pipeline automático que valida cada commit en Git, compila el proyecto, corre tests y lo publica en servidores sin intervención manual.",
        "pista_didactica": "Una línea de ensamblaje moderna: cada pieza pasa por sensores automáticos antes de salir al mercado."
      },
      {
        "frente": "¿Qué problema resuelve Docker con los contenedores?",
        "dorso": "Empaqueta la app con todas sus librerías del sistema, garantizando que corra exactamente igual en tu laptop que en un cluster de la nube.",
        "pista_didactica": "Un contenedor de barco estándar: se puede transportar en camión, tren o barco sin preocuparse por lo que lleva adentro."
      },
      {
        "frente": "¿Para qué sirve OCI Object Storage en la arquitectura de NuevaMente?",
        "dorso": "Almacena los documentos originales subidos por los alumnos y los archivos JSON con las flashcards generadas de forma segura y Always Free.",
        "pista_didactica": "Es el almacén indestructible donde se guardan los exámenes y certificados del sistema."
      }
    ],
    "sintesis": {
      "resumen_ejecutivo": "DevOps integra prácticas de integración continua (CI) y despliegue continuo (CD) con contenedores Docker y orquestación Kubernetes. La persistencia inmutable de artefactos se respalda en la nube de Oracle (OCI Object Storage) asegurando resiliencia y cumplimiento de la capa Always Free.",
      "puntos_clave": [
        "Automatización completa desde el commit en Git hasta producción.",
        "Contenedores portables e inmutables aislados del sistema operativo anfitrión.",
        "Persistencia en la nube de OCI bajo arquitectura sin costos monetarios."
      ],
      "terminos_clave": ["CI/CD Pipeline", "Docker", "Kubernetes", "OCI Object Storage", "Always Free"]
    },
    "video": {
      "titulo_video": "Despliegue Continuo e Infraestructura Cloud en OCI",
      "duracion": "4:10 min",
      "puntos_video": [
        "Min 0:45 - El ciclo de vida de un commit: compilación y tests automáticos.",
        "Min 2:00 - Empaquetando en imagen Docker y subiendo a registry.",
        "Min 3:15 - Conectando con buckets de OCI Object Storage."
      ]
    },
    "quiz": {
      "pregunta": "¿Por qué es crucial para el proyecto NuevaMente utilizar OCI Object Storage dentro de la capa Always Free?",
      "opciones": [
        "Para garantizar la persistencia de documentos originales y JSONs adaptados cumpliendo la gratuidad obligatoria de ONE.",
        "Porque es el único servicio que permite escribir código HTML.",
        "Porque borra automáticamente todos los archivos cada 10 minutos.",
        "Para evitar que los alumnos puedan ver las tarjetas didácticas."
      ],
      "correcta": 0,
      "explicacion": "El programa ONE exige utilizar estrictamente la capa Always Free de OCI para garantizar una infraestructura en la nube sin costos para los estudiantes."
    }
  }
};

/**
 * Muestras pre-indexadas de documentos para pruebas instantáneas en la demo.
 */
export const sampleDocuments = {
  "proyecto": {
    "titulo": "NuevaMente: Sistema de Adaptación Educativa ONE",
    "filename": "Nuevamente Proyecto.pdf",
    "nicho": "ia",
    "metadatos": {
      "document_id": "doc_nuevamente_one_2026",
      "filename": "Nuevamente Proyecto.pdf",
      "perfil": "principiante",
      "nicho": "Inteligencia Artificial & RAG",
      "nivel_detalle": "equilibrado",
      "formato_salida": "todos",
      "timestamp": "2026-09-21T11:45:00Z"
    },
    "evaluacion_calidad": {
      "fidelidad_fuente": 0.994,
      "coherencia_pedagogica": 0.987,
      "score_global": 0.99,
      "chunks_utilizados": 16
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-object-storage",
      "oci_path": "oci://bucket-nuevamente/docs/2026/nuevamente_proyecto.json",
      "estado": "persisted_always_free"
    },
    "contenido_adaptado": {
      "titulo": "NuevaMente: Arquitectura Multiagente y RAG Pedagógico",
      "flashcards": [
        {
          "frente": "¿Cuál es la misión principal de NuevaMente?",
          "dorso": "Transformar documentos técnicos densos (PDFs, manuales) en contenidos educativos adaptados a 4 formatos: Flashcards, Quizzes, Videos y Resúmenes ejecutivos.",
          "pista_didactica": "Actúa como un traductor pedagógico universal impulsado por IA."
        },
        {
          "frente": "¿Qué rol cumple ChromaDB en el flujo de indexación?",
          "dorso": "Almacena los fragmentos (chunks) vectorizados del documento original para permitir búsquedas semánticas precisas antes de la generación del LLM.",
          "pista_didactica": "Es la biblioteca con índice inteligente que encuentra la página exacta en milisegundos."
        },
        {
          "frente": "¿Cómo asegura el Agente Crítico la fidelidad pedagógica?",
          "dorso": "Evalúa que el contenido generado no tenga alucinaciones, respete la fuente original y cumpla estrictamente con la estructura JSON esperada por el frontend.",
          "pista_didactica": "Es el corrector de estilo y auditor técnico antes de publicar."
        }
      ],
      "sintesis": {
        "resumen_ejecutivo": "NuevaMente desacopla la indexación de la generación: los documentos técnicos se procesan una sola vez en ChromaDB y OCI Object Storage. Luego, el router multiagente coordina la creación de 4 formatos pedagógicos (Flashcards, Quizzes, Tutoriales y Resúmenes) según el perfil del estudiante.",
        "puntos_clave": [
          "Indexación única (One-time indexing) con reutilización para múltiples formatos pedagógicos.",
          "Agente Generador RAG con recuperación semántica filtrada por document_id.",
          "Agente Crítico de control de calidad garantizando cero alucinaciones y estricto JSON.",
          "Infraestructura cloud costo cero soportada en Oracle Cloud OCI Always Free."
        ],
        "terminos_clave": ["RAG Pedagógico", "ChromaDB", "Agente Crítico", "OCI Always Free", "JSON Estructurado"]
      },
      "video": {
        "titulo_video": "Tutorial: De Documento Técnico a 4 Formatos Educativos con RAG",
        "duracion": "3:50 min",
        "puntos_video": [
          "Min 0:30 - Carga de documento y particionado en chunks en ChromaDB.",
          "Min 1:40 - Retrieval semántico por el Agente Generador.",
          "Min 2:50 - Validación del Agente Revisor y resolución en los 4 formatos."
        ]
      },
      "quiz": {
        "pregunta": "¿Por qué la arquitectura de NuevaMente realiza la indexación una sola vez por documento?",
        "opciones": [
          "Porque permite generar ilimitadas veces contenidos para distintos perfiles y formatos sin re-procesar el documento original.",
          "Porque el almacenamiento de la nube se agota después de una sola lectura.",
          "Porque la inteligencia artificial no permite leer un archivo dos veces.",
          "Para obligar al estudiante a memorizar el archivo antes de subirlo."
        ],
        "correcta": 0,
        "explicacion": "La indexación desacoplada ahorra recursos computacionales y permite que a partir de un solo documento indexado en ChromaDB se generen flashcards, quizzes y guiones para múltiples perfiles."
      }
    }
  },

  "ciencia_datos": {
    "titulo": "Plan de Acción: Ciencia de Datos Aplicada",
    "filename": "Plan_Accion_Ciencia_Datos_NuevaMente_v2.pdf",
    "nicho": "datascience",
    "metadatos": {
      "document_id": "doc_datascience_actionplan_2026",
      "filename": "Plan_Accion_Ciencia_Datos_NuevaMente_v2.pdf",
      "perfil": "intermedio",
      "nicho": "Ciencia de Datos & Pipelines",
      "nivel_detalle": "profundo",
      "formato_salida": "todos",
      "timestamp": "2026-09-21T11:46:00Z"
    },
    "evaluacion_calidad": {
      "fidelidad_fuente": 0.996,
      "coherencia_pedagogica": 0.989,
      "score_global": 0.992,
      "chunks_utilizados": 19
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-object-storage",
      "oci_path": "oci://bucket-nuevamente/docs/2026/plan_ciencia_datos.json",
      "estado": "persisted_always_free"
    },
    "contenido_adaptado": {
      "titulo": "Plan de Acción de Ciencia de Datos & Métricas RAG",
      "flashcards": [
        {
          "frente": "¿Qué métricas determinan la efectividad de un pipeline RAG?",
          "dorso": "Context Recall (cobertura del contexto recuperado), Context Precision (relevancia de los chunks) y Faithfulness (ausencia de alucinaciones en la respuesta).",
          "pista_didactica": "Miden si encontraste las piezas correctas y si construiste la figura fielmente con ellas."
        },
        {
          "frente": "¿Cómo se optimiza el tamaño de Chunk (Chunk Size) para documentos densos?",
          "dorso": "Se busca un equilibrio de entre 400 y 800 tokens con overlap (solapamiento) del 15% para no fragmentar oraciones o conceptos interdependientes.",
          "pista_didactica": "Como cortar un libro en capítulos cortos sin cortar una frase a la mitad."
        }
      ],
      "sintesis": {
        "resumen_ejecutivo": "El plan de acción de Ciencia de Datos establece la calibración de embeddings y la cuantificación de fidelidad del sistema NuevaMente mediante frameworks de evaluación RAG (Ragas y TruLens), asegurando coherencia conceptual en cada respuesta generada.",
        "puntos_clave": [
          "Calibración de chunking con solapamiento semántico.",
          "Monitoreo de precisión de retrieval y fidelidad contra la fuente.",
          "Persistencia de embeddings vectoriales en ChromaDB con metadatos estructurados."
        ],
        "terminos_clave": ["Chunk Size", "Chunk Overlap", "Context Recall", "Faithfulness", "Ragas"]
      },
      "video": {
        "titulo_video": "Calibrando Embeddings y Métricas RAG para Educación",
        "duracion": "4:15 min",
        "puntos_video": [
          "Min 0:40 - Definición de la estrategia de Chunking.",
          "Min 2:10 - Cálculo de embeddings y similitud coseno.",
          "Min 3:30 - Matriz de fidelidad y evaluación con Agente Crítico."
        ]
      },
      "quiz": {
        "pregunta": "¿Qué ocurre si el chunk size es demasiado pequeño en la indexación RAG?",
        "opciones": [
          "Se pierde el contexto conceptual completo de la idea, provocando respuestas incompletas.",
          "La base de datos se borra automáticamente.",
          "Aumenta el tamaño físico del archivo en el disco rígido.",
          "El modelo LLM rechaza todas las consultas."
        ],
        "correcta": 0,
        "explicacion": "Chunks excesivamente pequeños aíslan oraciones perdiendo el contexto necesario para que el modelo responda con precisión."
      }
    }
  },

  "arquitectura": {
    "titulo": "Arquitectura Cloud, Microservicios y OCI",
    "filename": "Arquitectura_Cloud_OCI.txt",
    "nicho": "devops",
    "metadatos": {
      "document_id": "doc_arch_cloud_2026",
      "filename": "Arquitectura_Cloud_OCI.txt",
      "perfil": "avanzado",
      "nicho": "DevOps & Cloud (Oracle Cloud OCI)",
      "nivel_detalle": "profundo",
      "formato_salida": "todos",
      "timestamp": "2026-09-21T11:47:00Z"
    },
    "evaluacion_calidad": {
      "fidelidad_fuente": 0.991,
      "coherencia_pedagogica": 0.982,
      "score_global": 0.986,
      "chunks_utilizados": 15
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-object-storage",
      "oci_path": "oci://bucket-nuevamente/docs/2026/arquitectura_cloud.json",
      "estado": "persisted_always_free"
    },
    "contenido_adaptado": {
      "titulo": "Arquitectura Desacoplada en la Nube con OCI Always Free",
      "flashcards": [
        {
          "frente": "¿Qué garantiza el desacoplamiento entre Ingesta y Generación?",
          "dorso": "Permite escalar la API de consulta independientemente del proceso de indexación, reduciendo costos computacionales y latencia en el frontend.",
          "pista_didactica": "La fábrica produce piezas en un horario y los clientes las compran en cualquier momento."
        }
      ],
      "sintesis": {
        "resumen_ejecutivo": "La arquitectura técnica de NuevaMente aprovecha la infraestructura de Oracle Cloud Infrastructure (OCI) para persistencia inmutable de documentos y metadatos, comunicándose vía REST APIs con el frontend web de alta velocidad.",
        "puntos_clave": [
          "Infraestructura cloud Always Free sin costes operativos.",
          "Desacoplamiento total entre frontend estático y backend de microservicios.",
          "Vector store local de alta velocidad con ChromaDB."
        ],
        "terminos_clave": ["OCI Always Free", "Object Storage", "Decoupled Architecture", "Vector Search"]
      },
      "video": {
        "titulo_video": "Arquitectura de NuevaMente: Del Frontend al Cloud de OCI",
        "duracion": "3:40 min",
        "puntos_video": [
          "Min 0:30 - Diseño del frontend reactivo sin dependencias pesadas.",
          "Min 1:50 - Endpoint REST y serialización de JSON estructurado.",
          "Min 3:00 - Persistencia en OCI Object Storage."
        ]
      },
      "quiz": {
        "pregunta": "¿Cuál es la principal ventaja de mantener el frontend desacoplado del backend de IA?",
        "opciones": [
          "Permite que la interfaz cargue instantáneamente y funcione incluso con mocks mientras el backend escala o se actualiza.",
          "Que el frontend no necesita utilizar colores ni fuentes.",
          "Que el código se borra al cerrar el navegador.",
          "Que no se puede usar CSS ni JavaScript."
        ],
        "correcta": 0,
        "explicacion": "El desacoplamiento garantiza que la interfaz de usuario sea ágil, testeable y resistente a fallos de red o mantenimientos de la API."
      }
    }
  }
};

/**
 * Generador dinámico para documentos personalizados subidos por el usuario en modo frontend
 */
export function buildDynamicAdaptedPayload(fileName, perfil, formato, nicho, detalle) {
  const cleanName = fileName ? fileName.replace(/\.[^/.]+$/, "") : "Documento Técnico";
  const docId = `doc_${Math.random().toString(36).substring(2, 10)}`;
  
  const perfilDesc = perfil === 'avanzado' ? 'Avanzado / Tech Lead' : (perfil === 'intermedio' ? 'Intermedio / Desarrollador Jr' : 'Principiante / Estudiante ONE');
  const nichoLabel = nicho === 'backend' ? 'Backend & APIs' : (nicho === 'frontend' ? 'Frontend & UX' : (nicho === 'datascience' ? 'Ciencia de Datos' : (nicho === 'devops' ? 'DevOps & OCI' : 'Desarrollo de Software')));

  return {
    "status": "success",
    "metadatos": {
      "document_id": docId,
      "filename": fileName || "documento_tecnico.pdf",
      "perfil": perfilDesc,
      "nicho": nichoLabel,
      "nivel_detalle": detalle,
      "formato_salida": formato,
      "timestamp": new Date().toISOString()
    },
    "evaluacion_calidad": {
      "fidelidad_fuente": 0.993,
      "coherencia_pedagogica": 0.986,
      "score_global": 0.99,
      "chunks_utilizados": 14
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-object-storage",
      "oci_path": `oci://bucket-nuevamente/docs/2026/${docId}.json`,
      "estado": "persisted_always_free"
    },
    "contenido_adaptado": {
      "titulo": `${cleanName} — Adaptación Pedagógica (${perfilDesc})`,
      "flashcards": [
        {
          "frente": `¿Cuál es el postulado central analizado en ${cleanName}?`,
          "dorso": `Presenta la metodología de diseño modular y buenas prácticas técnicas en ${nichoLabel}, priorizando claridad conceptual y escalabilidad.`,
          "pista_didactica": "Recuerda el objetivo fundamental de simplificar la complejidad técnica."
        },
        {
          "frente": `¿Qué solución propone el documento para optimizar la arquitectura?`,
          "dorso": `Desacoplar componentes independientes, utilizar validación estricta de datos y mantener persistencia inmutable en la nube.`,
          "pista_didactica": "Divide y vencerás: cada módulo se especializa en una tarea puntual."
        },
        {
          "frente": `¿Cómo se evalúa la calidad según los estándares de ${cleanName}?`,
          "dorso": `Mediante validación automática de coherencia pedagógica, tests de regresión y fidelidad con la fuente original (>98%).`,
          "pista_didactica": "Medir objetivamente antes de poner en producción."
        }
      ],
      "sintesis": {
        "resumen_ejecutivo": `Este documento fue procesado mediante el pipeline RAG de NuevaMente. Los fragmentos se indexaron en ChromaDB respetando el nivel de detalle '${detalle}' y se adaptaron al perfil '${perfilDesc}'. Proporciona una síntesis clara orientada a la aplicación directa en proyectos reales.`,
        "puntos_clave": [
          `Indexación vectorial semántica con chunking contextual adaptado a ${nichoLabel}.`,
          `Generación de conceptos clave orientados a estudiantes de nivel ${perfilDesc}.`,
          "Supervisión estricta por el Agente Revisor para eliminar discrepancias conceptuales.",
          "Compatibilidad nativa con la infraestructura Always Free de OCI."
        ],
        "terminos_clave": ["RAG Adaptativo", cleanName.slice(0, 15), nichoLabel, "ChromaDB", "Validación Crítica"]
      },
      "video": {
        "titulo_video": `Tutorial Guiado: Domina ${cleanName} paso a paso`,
        "duracion": "4:00 min",
        "puntos_video": [
          `Min 0:30 - Introducción al contexto y motivación de ${cleanName}.`,
          `Min 1:50 - Análisis del núcleo técnico y patrones recomendados en ${nichoLabel}.`,
          "Min 3:15 - Conclusiones prácticas y plan de acción para implementar."
        ]
      },
      "quiz": {
        "pregunta": `Según el análisis pedagógico de ${cleanName}, ¿cuál es el paso primordial para implementar esta solución?`,
        "opciones": [
          `Comprender la arquitectura general y validar los requerimientos antes de escribir código.`,
          "Ignorar las buenas prácticas e iniciar sin documentación.",
          "Eliminar todos los tests unitarios para ganar tiempo.",
          "Ejecutar el sistema sin verificar la conectividad de datos."
        ],
        "correcta": 0,
        "explicacion": `El documento enfatiza que la planificación y la comprensión conceptual sólida son los cimientos indispensables para evitar deuda técnica.`
      }
    }
  };
}
