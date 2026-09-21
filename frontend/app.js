// app.js - Libro Interactivo de 5 Pilares & Flujo Funcional RAG Adaptativo
import { mockDatabase, sampleDocuments, buildDynamicAdaptedPayload } from './mockData.js';

// Estado global de la aplicación
const state = {
  currentSpreadIndex: 0, // 0: Portada, 1: Backend/Frontend, 2: DataScience/IA, 3: DevOps/Índice (AL FINAL)
  currentTopic: 'backend',
  currentFormat: 'flashcards', // 'flashcards', 'quiz', 'video', 'sintesis'
  deck: [],
  currentCardIndex: 0,
  isFlipped: false,
  isStudyModalOpen: false,
  isArchModalOpen: false,
  isUploadModalOpen: false,
  isJsonModalOpen: false,
  isTurningPage: false,
  isProcessing: false,
  apiMode: 'mock',
  theme: localStorage.getItem('nuevamente-theme') || 'dark',
  selectedFile: {
    name: 'Nuevamente Proyecto.pdf',
    size: '2.8 MB',
    format: 'PDF',
    sampleKey: 'proyecto'
  },
  lastStructuredJson: null
};

// Mapeo de Spreads (Página 5 e Índice AL FINAL)
const spreads = [
  { id: 'viewCover', title: 'Portada', instruction: 'Explora los 5 Pilares Fundamentales del Desarrollo de Software.' },
  { id: 'spreadBackendFrontend', title: 'Pág 1: Backend | Pág 2: Frontend', instruction: 'Haz clic en "Estudiar" en cualquiera de las dos páginas para acceder a los recursos pedagógicos.' },
  { id: 'spreadDataScienceIA', title: 'Pág 3: Data Science | Pág 4: IA', instruction: 'Explora los diagramas de Pipelines de Datos y Redes Neuronales.' },
  { id: 'spreadDevOpsIndice', title: 'Pág 5: DevOps | Índice', instruction: 'Página final: Infraestructura DevOps y el Índice completo de materias.' }
];

// Elementos del DOM
const elements = {
  // Temas y Modos
  btnTheme: document.getElementById('btnTheme'),
  themeBtnText: document.getElementById('themeBtnText'),
  apiModeSelector: document.getElementById('apiModeSelector'),

  // Navegación del Libro
  bookSpreadIndicator: document.getElementById('bookSpreadIndicator'),
  guideInstruction: document.getElementById('guideInstruction'),
  btnIrPortada: document.getElementById('btnIrPortada'),
  btnOpenBook: document.getElementById('btnOpenBook'),
  btnPagePrev: document.getElementById('btnPagePrev'),
  btnPageNext: document.getElementById('btnPageNext'),
  turnOverlay: document.getElementById('turnOverlay'),
  bottomDock: document.getElementById('bottomDock'),
  dockTabs: document.querySelectorAll('.dock-tab'),
  spreadViews: document.querySelectorAll('.book-spread-view'),

  // Hotspots en las hojas
  pageHotspots: document.querySelectorAll('.page-hotspot'),
  indexRows: document.querySelectorAll('.index-row-hotspot'),

  // Modal de Estudio Multi-formato
  studyHubModal: document.getElementById('studyHubModal'),
  btnCloseStudyModal: document.getElementById('btnCloseStudyModal'),
  modalTopicBadge: document.getElementById('modalTopicBadge'),
  modalTopicTitle: document.getElementById('modalTopicTitle'),
  btnMiniVerJson: document.getElementById('btnMiniVerJson'),
  formatTabBtns: document.querySelectorAll('.format-tab-btn'),
  formatViews: document.querySelectorAll('.format-view'),

  // Formato: Flashcards
  currentCard: document.getElementById('currentCard'),
  cardProgressTop: document.getElementById('cardProgressTop'),
  cardFrontText: document.getElementById('cardFrontText'),
  cardBackText: document.getElementById('cardBackText'),
  cardHintText: document.getElementById('cardHintText'),
  btnPrevCard: document.getElementById('btnPrevCard'),
  btnNextCard: document.getElementById('btnNextCard'),
  btnFlipCard: document.getElementById('btnFlipCard'),
  cardCounter: document.getElementById('cardCounter'),

  // Formato: Síntesis / Resumen RAG
  sintesisResumen: document.getElementById('sintesisResumen'),
  sintesisPuntosList: document.getElementById('sintesisPuntosList'),
  sintesisTerminosChips: document.getElementById('sintesisTerminosChips'),

  // Formato: Video / Tutorial
  videoMockupTitle: document.getElementById('videoMockupTitle'),
  videoDuration: document.getElementById('videoDuration'),
  videoScriptList: document.getElementById('videoScriptList'),

  // Formato: Quiz Interactivo
  quizQuestionText: document.getElementById('quizQuestionText'),
  quizOptionsList: document.getElementById('quizOptionsList'),
  quizFeedbackBox: document.getElementById('quizFeedbackBox'),
  quizFeedbackBadge: document.getElementById('quizFeedbackBadge'),
  quizFeedbackText: document.getElementById('quizFeedbackText'),

  // Modal de Arquitectura RAG
  btnVerArquitectura: document.getElementById('btnVerArquitectura'),
  archModal: document.getElementById('archModal'),
  btnCloseArch: document.getElementById('btnCloseArch'),

  // Ingesta & Carga de Documento
  btnAbrirCargaDoc: document.getElementById('btnAbrirCargaDoc'),
  uploadDocModal: document.getElementById('uploadDocModal'),
  btnCloseUploadModal: document.getElementById('btnCloseUploadModal'),
  btnCancelUpload: document.getElementById('btnCancelUpload'),
  dropArea: document.getElementById('dropArea'),
  docFileInput: document.getElementById('docFileInput'),
  selectedFileCard: document.getElementById('selectedFileCard'),
  selectedFileName: document.getElementById('selectedFileName'),
  selectedFileSize: document.getElementById('selectedFileSize'),
  fileFormatIcon: document.getElementById('fileFormatIcon'),
  btnRemoveFile: document.getElementById('btnRemoveFile'),
  quickFileBtns: document.querySelectorAll('.btn-quick-file'),

  // Parámetros de Adaptación
  paramPerfil: document.getElementById('paramPerfil'),
  paramFormato: document.getElementById('paramFormato'),
  paramNicho: document.getElementById('paramNicho'),
  paramDetalle: document.getElementById('paramDetalle'),

  // Pipeline Stepper
  pipelineSection: document.getElementById('pipelineSection'),
  pipelineStatusBadge: document.getElementById('pipelineStatusBadge'),
  stepOci: document.getElementById('stepOci'),
  stepChroma: document.getElementById('stepChroma'),
  stepGen: document.getElementById('stepGen'),
  stepCritic: document.getElementById('stepCritic'),
  line1: document.getElementById('line1'),
  line2: document.getElementById('line2'),
  line3: document.getElementById('line3'),
  pipelineLiveLog: document.getElementById('pipelineLiveLog'),
  btnLanzarProcesamiento: document.getElementById('btnLanzarProcesamiento'),

  // Resultado Resolver
  resultResolverSection: document.getElementById('resultResolverSection'),
  badgeFidelidad: document.getElementById('badgeFidelidad'),
  badgeCoherencia: document.getElementById('badgeCoherencia'),
  badgeChunks: document.getElementById('badgeChunks'),
  resolverFormatCards: document.querySelectorAll('.btn-resolver-card'),
  btnVerJsonRaw: document.getElementById('btnVerJsonRaw'),
  btnCargarAlCuaderno: document.getElementById('btnCargarAlCuaderno'),

  // Visor de JSON
  jsonModal: document.getElementById('jsonModal'),
  btnCloseJsonModal: document.getElementById('btnCloseJsonModal'),
  btnCopyJson: document.getElementById('btnCopyJson'),
  jsonCodeDisplay: document.getElementById('jsonCodeDisplay'),
  jsonModalTitle: document.getElementById('jsonModalTitle'),

  // Barra de Estado OCI
  ociStatusText: document.getElementById('ociStatusText'),
  qualityScoreText: document.getElementById('qualityScoreText')
};

// Inicialización de la Aplicación
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
  setupIngestionModule();
  updateSpreadView(0);
});

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  elements.themeBtnText.textContent = state.theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('nuevamente-theme', state.theme);
  elements.themeBtnText.textContent = state.theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
}

function setupEventListeners() {
  // Tema
  elements.btnTheme.addEventListener('click', toggleTheme);

  // Modo API
  elements.apiModeSelector.addEventListener('change', (e) => {
    state.apiMode = e.target.value;
  });

  // Abrir libro desde portada
  elements.btnOpenBook.addEventListener('click', () => {
    goToSpread(1); // Va a Páginas 1 y 2
  });

  // Volver a portada
  elements.btnIrPortada.addEventListener('click', () => {
    goToSpread(0);
  });

  // Flechas laterales de cambio de página
  elements.btnPagePrev.addEventListener('click', () => {
    if (state.currentSpreadIndex > 0) {
      goToSpread(state.currentSpreadIndex - 1);
    }
  });

  elements.btnPageNext.addEventListener('click', () => {
    if (state.currentSpreadIndex < spreads.length - 1) {
      goToSpread(state.currentSpreadIndex + 1);
    }
  });

  // Pestañas inferiores del dock (Navegan spreads fluidamente sin saltar tarjetas)
  elements.dockTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const spreadIndex = parseInt(tab.getAttribute('data-spread-index'), 10);
      if (!isNaN(spreadIndex)) {
        goToSpread(spreadIndex);
      }
    });
  });

  // Hotspots en las hojas (Botones "Estudiar [Pilar]") -> Abren el Study Hub
  elements.pageHotspots.forEach(hotspot => {
    hotspot.addEventListener('click', (e) => {
      e.stopPropagation();
      const topic = hotspot.getAttribute('data-topic');
      if (topic) openStudyHub(topic);
    });
  });

  // Filas del Índice (Página 5) -> Pasan suavemente a la página correspondiente
  elements.indexRows.forEach((row, index) => {
    row.addEventListener('click', () => {
      if (index === 0 || index === 1) {
        goToSpread(1); // Backend o Frontend (Págs 1 y 2)
      } else if (index === 2 || index === 3) {
        goToSpread(2); // Data Science o IA (Págs 3 y 4)
      } else if (index === 4) {
        goToSpread(3); // DevOps (Pág 5)
      }
    });
  });

  // Pestañas de Formato dentro del Modal (4 Salidas: Flashcards, Quiz, Video, Resumen)
  elements.formatTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const format = btn.getAttribute('data-format');
      switchFormat(format);
    });
  });

  // Control de Flashcards
  elements.currentCard.addEventListener('click', flipCard);
  elements.btnFlipCard.addEventListener('click', flipCard);
  elements.btnPrevCard.addEventListener('click', goToPrevCard);
  elements.btnNextCard.addEventListener('click', goToNextCard);

  // Cerrar Modal de Estudio
  elements.btnCloseStudyModal.addEventListener('click', closeStudyHub);

  // Botón mini { } JSON dentro del header del Study Hub
  elements.btnMiniVerJson.addEventListener('click', () => {
    const currentData = state.lastStructuredJson || getStructuredJsonForTopic(state.currentTopic);
    openJsonModal(currentData, `JSON Estructurado: ${state.currentTopic.toUpperCase()}`);
  });

  // Modal de Arquitectura
  elements.btnVerArquitectura.addEventListener('click', () => {
    elements.archModal.style.display = 'flex';
    state.isArchModalOpen = true;
  });
  elements.btnCloseArch.addEventListener('click', () => {
    elements.archModal.style.display = 'none';
    state.isArchModalOpen = false;
  });
  elements.archModal.addEventListener('click', (e) => {
    if (e.target === elements.archModal) {
      elements.archModal.style.display = 'none';
      state.isArchModalOpen = false;
    }
  });

  // Atajos de Teclado
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      if (state.isJsonModalOpen) closeJsonModal();
      else if (state.isUploadModalOpen && !state.isProcessing) closeUploadModal();
      else if (state.isArchModalOpen) {
        elements.archModal.style.display = 'none';
        state.isArchModalOpen = false;
      } else if (state.isStudyModalOpen) closeStudyHub();
      return;
    }

    if (state.isStudyModalOpen) {
      if (state.currentFormat === 'flashcards') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          flipCard();
        } else if (e.code === 'ArrowRight') {
          e.preventDefault();
          goToNextCard();
        } else if (e.code === 'ArrowLeft') {
          e.preventDefault();
          goToPrevCard();
        }
      }
      return;
    }

    // Navegación de páginas con flechas del teclado
    if (e.code === 'ArrowRight') {
      if (state.currentSpreadIndex < spreads.length - 1) {
        goToSpread(state.currentSpreadIndex + 1);
      }
    } else if (e.code === 'ArrowLeft') {
      if (state.currentSpreadIndex > 0) {
        goToSpread(state.currentSpreadIndex - 1);
      }
    }
  });
}

// Navegar fluidamente con animación de pasar hoja (animacion3d.jpg)
function goToSpread(targetIndex) {
  if (state.isTurningPage || targetIndex === state.currentSpreadIndex) return;

  state.isTurningPage = true;
  elements.turnOverlay.classList.add('turning');

  setTimeout(() => {
    updateSpreadView(targetIndex);
    elements.turnOverlay.classList.remove('turning');
    state.isTurningPage = false;
  }, 320);
}

function updateSpreadView(index) {
  state.currentSpreadIndex = index;
  const currentSpread = spreads[index];

  // Activar la vista del spread
  elements.spreadViews.forEach(view => {
    if (view.id === currentSpread.id) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });

  // Actualizar textos guía
  elements.bookSpreadIndicator.textContent = currentSpread.title;
  elements.guideInstruction.textContent = currentSpread.instruction;

  // Flechas y botón de volver
  if (index === 0) {
    elements.btnIrPortada.style.display = 'none';
    elements.btnPagePrev.style.display = 'none';
    elements.btnPageNext.style.display = 'none';
  } else {
    elements.btnIrPortada.style.display = 'inline-block';
    elements.btnPagePrev.style.display = 'flex';
    elements.btnPageNext.style.display = index === spreads.length - 1 ? 'none' : 'flex';
  }

  // Sincronizar pestaña activa en el dock inferior
  elements.dockTabs.forEach(tab => {
    const tabSpreadIndex = parseInt(tab.getAttribute('data-spread-index'), 10);
    if (tabSpreadIndex === index) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

/* ==========================================================================
   MÓDULO DE INGESTA DE DOCUMENTO & PARÁMETROS RAG
   ========================================================================== */
function setupIngestionModule() {
  // Abrir y cerrar modal
  elements.btnAbrirCargaDoc.addEventListener('click', openUploadModal);
  elements.btnCloseUploadModal.addEventListener('click', closeUploadModal);
  elements.btnCancelUpload.addEventListener('click', closeUploadModal);
  elements.uploadDocModal.addEventListener('click', (e) => {
    if (e.target === elements.uploadDocModal && !state.isProcessing) {
      closeUploadModal();
    }
  });

  // Drag and Drop
  elements.dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    elements.dropArea.classList.add('dragover');
  });

  elements.dropArea.addEventListener('dragleave', () => {
    elements.dropArea.classList.remove('dragover');
  });

  elements.dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    elements.dropArea.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  });

  // Selector clásico
  elements.docFileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  });

  // Quitar archivo
  elements.btnRemoveFile.addEventListener('click', () => {
    state.selectedFile = null;
    elements.selectedFileCard.style.display = 'none';
    elements.dropArea.style.display = 'block';
    elements.quickFileBtns.forEach(b => b.classList.remove('active'));
  });

  // Botones de archivos de prueba
  elements.quickFileBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.quickFileBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sampleKey = btn.getAttribute('data-sample');
      loadSampleFile(sampleKey);
    });
  });

  // Iniciar con archivo de prueba preseleccionado
  loadSampleFile('proyecto');

  // Lanzar procesamiento RAG
  elements.btnLanzarProcesamiento.addEventListener('click', launchRagPipeline);

  // Botones del Resolver de Formato
  elements.resolverFormatCards.forEach(btn => {
    btn.addEventListener('click', () => {
      const format = btn.getAttribute('data-resolve-format');
      resolveFormatAndStudy(format);
    });
  });

  // Ver JSON estructurado desde resultado
  elements.btnVerJsonRaw.addEventListener('click', () => {
    if (state.lastStructuredJson) {
      openJsonModal(state.lastStructuredJson, `JSON RAG: ${state.lastStructuredJson.metadatos.filename}`);
    }
  });

  // Estudiar en el cuaderno
  elements.btnCargarAlCuaderno.addEventListener('click', () => {
    resolveFormatAndStudy('flashcards');
  });

  // Configuración del modal de JSON
  elements.btnCloseJsonModal.addEventListener('click', closeJsonModal);
  elements.jsonModal.addEventListener('click', (e) => {
    if (e.target === elements.jsonModal) closeJsonModal();
  });
  elements.btnCopyJson.addEventListener('click', copyJsonToClipboard);
}

function openUploadModal() {
  elements.uploadDocModal.style.display = 'flex';
  state.isUploadModalOpen = true;
}

function closeUploadModal() {
  if (state.isProcessing) return;
  elements.uploadDocModal.style.display = 'none';
  state.isUploadModalOpen = false;
}

function handleFileSelected(file) {
  const ext = file.name.split('.').pop().toUpperCase();
  const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
  
  state.selectedFile = {
    name: file.name,
    size: `${sizeMb} MB`,
    format: ext,
    rawFile: file,
    sampleKey: null
  };

  displaySelectedFile();
  elements.quickFileBtns.forEach(b => b.classList.remove('active'));
}

function loadSampleFile(sampleKey) {
  const sample = sampleDocuments[sampleKey];
  if (!sample) return;

  state.selectedFile = {
    name: sample.filename,
    size: '2.4 MB',
    format: sample.filename.split('.').pop().toUpperCase(),
    sampleKey: sampleKey
  };

  displaySelectedFile();

  // Ajustar sugerencias de parámetros según muestra
  if (sample.metadatos) {
    if (sample.metadatos.perfil) elements.paramPerfil.value = sample.metadatos.perfil;
    if (sample.metadatos.nicho) elements.paramNicho.value = sample.nicho || 'auto';
  }
}

function displaySelectedFile() {
  if (!state.selectedFile) return;

  elements.selectedFileName.textContent = state.selectedFile.name;
  elements.selectedFileSize.textContent = `${state.selectedFile.size} · Listo para indexación`;
  elements.fileFormatIcon.textContent = state.selectedFile.format || 'DOC';
  elements.selectedFileCard.style.display = 'flex';
  elements.dropArea.style.display = 'none';
}

/* ==========================================================================
   PIPELINE STEPPER & EJECUCIÓN MULTIAGENTE RAG
   ========================================================================== */
async function launchRagPipeline() {
  if (!state.selectedFile) {
    alert('Por favor selecciona o arrastra un documento técnico primero.');
    return;
  }

  state.isProcessing = true;
  elements.btnLanzarProcesamiento.disabled = true;
  elements.btnCancelUpload.disabled = true;

  // Mostrar el stepper y ocultar resultados previos
  elements.pipelineSection.style.display = 'flex';
  elements.resultResolverSection.style.display = 'none';

  // Resetear clases del stepper
  resetStepperUI();

  const perfil = elements.paramPerfil.value;
  const formato = elements.paramFormato.value;
  const nicho = elements.paramNicho.value;
  const detalle = elements.paramDetalle.value;

  try {
    // Paso 1: OCI Storage & Metadata
    setStepActive(elements.stepOci, 'Persistiendo documento técnico en OCI Object Storage (Always Free)...');
    await waitMs(600);
    setStepCompleted(elements.stepOci, elements.line1);

    // Paso 2: ChromaDB
    setStepActive(elements.stepChroma, 'Indexando en ChromaDB: particionando chunks y calculando embeddings...');
    await waitMs(750);
    setStepCompleted(elements.stepChroma, elements.line2);

    // Paso 3: Agente Generador LLM
    setStepActive(elements.stepGen, `Agente Generador: Retrieval semántico de top-k chunks para perfil [${perfil}]...`);
    await waitMs(850);
    setStepCompleted(elements.stepGen, elements.line3);

    // Paso 4: Agente Revisor / Crítico
    setStepActive(elements.stepCritic, 'Agente Crítico: Evaluando fidelidad conceptual (99.2%) y estructura JSON...');
    await waitMs(650);
    setStepCompleted(elements.stepCritic, null);

    // Generar o cargar payload estructurado
    let payload;
    if (state.selectedFile.sampleKey && sampleDocuments[state.selectedFile.sampleKey]) {
      payload = JSON.parse(JSON.stringify(sampleDocuments[state.selectedFile.sampleKey]));
      payload.metadatos.perfil = perfil;
      payload.metadatos.formato_salida = formato;
      payload.metadatos.nivel_detalle = detalle;
    } else {
      payload = buildDynamicAdaptedPayload(state.selectedFile.name, perfil, formato, nicho, detalle);
    }

    state.lastStructuredJson = payload;

    // Actualizar badges de calidad en resultado
    elements.badgeFidelidad.textContent = `Fidelidad: ${(payload.evaluacion_calidad.fidelidad_fuente * 100).toFixed(1)}%`;
    elements.badgeCoherencia.textContent = `Coherencia: ${(payload.evaluacion_calidad.coherencia_pedagogica * 100).toFixed(1)}%`;
    elements.badgeChunks.textContent = `ChromaDB Chunks: ${payload.evaluacion_calidad.chunks_utilizados || 14}`;

    elements.pipelineStatusBadge.textContent = 'Completado ✓';
    elements.pipelineStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
    elements.pipelineStatusBadge.style.color = '#10b981';
    elements.pipelineLiveLog.textContent = '¡Validación exitosa por el Agente Revisor! JSON estructurado listo.';

    // Mostrar sección de resultados
    elements.resultResolverSection.style.display = 'flex';

  } catch (error) {
    console.error('Error en pipeline:', error);
    elements.pipelineLiveLog.textContent = 'Error en el pipeline: ' + error.message;
  } finally {
    state.isProcessing = false;
    elements.btnLanzarProcesamiento.disabled = false;
    elements.btnCancelUpload.disabled = false;
  }
}

function resetStepperUI() {
  const steps = [elements.stepOci, elements.stepChroma, elements.stepGen, elements.stepCritic];
  const lines = [elements.line1, elements.line2, elements.line3];

  steps.forEach(s => {
    s.classList.remove('active', 'completed');
  });
  lines.forEach(l => {
    if (l) l.classList.remove('completed');
  });

  elements.pipelineStatusBadge.textContent = 'Ejecutando...';
  elements.pipelineStatusBadge.style.background = 'rgba(6, 182, 212, 0.15)';
  elements.pipelineStatusBadge.style.color = 'var(--accent-cyan)';
}

function setStepActive(stepEl, logText) {
  stepEl.classList.add('active');
  elements.pipelineLiveLog.textContent = logText;
}

function setStepCompleted(stepEl, lineEl) {
  stepEl.classList.remove('active');
  stepEl.classList.add('completed');
  if (lineEl) lineEl.classList.add('completed');
}

function waitMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ==========================================================================
   RESOLVER DE FORMATO (FLASHCARDS, QUIZ, TUTORIAL, RESUMEN)
   ========================================================================== */
function resolveFormatAndStudy(targetFormat) {
  if (!state.lastStructuredJson) return;

  const adapted = state.lastStructuredJson.contenido_adaptado;
  const meta = state.lastStructuredJson.metadatos;

  // Registrar como tópico activo adaptado
  const customTopicKey = 'custom_adapted';
  mockDatabase[customTopicKey] = {
    titulo: adapted.titulo,
    metadatos: {
      tiempo_estudio: "5 min",
      anclaje_rag: Math.round(state.lastStructuredJson.evaluacion_calidad.score_global * 100),
      fidelidad: "Verificada (Crítico)"
    },
    flashcards: adapted.flashcards || [],
    sintesis: adapted.sintesis || {},
    video: adapted.video || {},
    quiz: adapted.quiz || {}
  };

  // Cerrar modal de carga
  closeUploadModal();

  // Abrir centro de estudio con el formato seleccionado
  openStudyHub(customTopicKey, targetFormat);
}

// Abrir el Centro de Estudio Multi-Formato
function openStudyHub(topic, initialFormat = 'flashcards') {
  state.currentTopic = topic;
  const topicData = mockDatabase[topic] || mockDatabase['backend'];

  elements.modalTopicBadge.textContent = topicData.titulo.split(':')[0] || 'ADAPTACIÓN';
  elements.modalTopicTitle.textContent = topicData.titulo.split(':')[1] || topicData.titulo;

  // Actualizar OCI y Calidad en el footer del libro
  if (topicData.metadatos) {
    elements.qualityScoreText.textContent = `Score Anclaje RAG: ${topicData.metadatos.anclaje_rag}% | Fidelidad: ${topicData.metadatos.fidelidad}`;
  }

  // 1. Formato: Flashcards
  state.deck = topicData.flashcards || [];
  state.currentCardIndex = 0;
  renderCard(0);

  // 2. Formato: Síntesis / Resumen RAG
  if (topicData.sintesis) {
    elements.sintesisResumen.textContent = topicData.sintesis.resumen_ejecutivo || '';
    elements.sintesisPuntosList.innerHTML = (topicData.sintesis.puntos_clave || []).map(p => `<li>${p}</li>`).join('');
    elements.sintesisTerminosChips.innerHTML = (topicData.sintesis.terminos_clave || []).map(t => `<span class="concept-chip">#${t}</span>`).join('');
  }

  // 3. Formato: Video / Tutorial
  if (topicData.video) {
    elements.videoMockupTitle.textContent = topicData.video.titulo_video || 'Tutorial Pedagógico';
    elements.videoDuration.textContent = topicData.video.duracion || '4:00 min';
    elements.videoScriptList.innerHTML = (topicData.video.puntos_video || []).map(item => `<li>${item}</li>`).join('');
  }

  // 4. Formato: Quiz Interactivo
  if (topicData.quiz) {
    renderQuiz(topicData.quiz);
  }

  // Cambiar al formato deseado (Flashcards, Quiz, Video, o Síntesis)
  switchFormat(initialFormat);

  elements.studyHubModal.classList.add('active');
  state.isStudyModalOpen = true;
}

function closeStudyHub() {
  elements.studyHubModal.classList.remove('active');
  state.isStudyModalOpen = false;
  state.isFlipped = false;
  elements.currentCard.classList.remove('flipped');
}

// Cambiar de formato pedagógico dentro del modal (4 Opciones)
function switchFormat(format) {
  state.currentFormat = format;

  // Actualizar botones de pestaña
  elements.formatTabBtns.forEach(btn => {
    if (btn.getAttribute('data-format') === format) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Mapeo hacia los contenedores de vista
  const formatMap = {
    flashcards: 'viewFormatFlashcards',
    quiz: 'viewFormatQuiz',
    video: 'viewFormatVideo',
    sintesis: 'viewFormatSintesis'
  };

  elements.formatViews.forEach(view => {
    if (view.id === formatMap[format]) {
      view.classList.add('active');
    } else {
      view.classList.remove('active');
    }
  });
}

// Lógica de Flashcards
function flipCard() {
  state.isFlipped = !state.isFlipped;
  if (state.isFlipped) {
    elements.currentCard.classList.add('flipped');
  } else {
    elements.currentCard.classList.remove('flipped');
  }
}

function renderCard(index) {
  if (!state.deck || state.deck.length === 0) return;

  state.isFlipped = false;
  elements.currentCard.classList.remove('flipped');

  const card = state.deck[index];
  elements.cardFrontText.textContent = card.frente;
  elements.cardBackText.textContent = card.dorso;
  elements.cardHintText.textContent = card.pista_didactica || 'Reflexiona sobre los conceptos fundamentales del módulo.';

  const total = state.deck.length;
  const currentNum = index + 1;
  elements.cardProgressTop.textContent = `${currentNum} / ${total}`;
  elements.cardCounter.textContent = `Tarjeta ${currentNum} de ${total}`;

  elements.btnPrevCard.disabled = index === 0;
  elements.btnNextCard.disabled = index === total - 1;
}

function goToNextCard() {
  if (state.currentCardIndex < state.deck.length - 1) {
    state.currentCardIndex++;
    renderCard(state.currentCardIndex);
  }
}

function goToPrevCard() {
  if (state.currentCardIndex > 0) {
    state.currentCardIndex--;
    renderCard(state.currentCardIndex);
  }
}

// Lógica de Quiz Interactivo
function renderQuiz(quizData) {
  elements.quizQuestionText.textContent = quizData.pregunta;
  elements.quizFeedbackBox.style.display = 'none';

  elements.quizOptionsList.innerHTML = '';
  quizData.opciones.forEach((opcion, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `<strong>${String.fromCharCode(65 + i)})</strong> ${opcion}`;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.quiz-option-btn').forEach(b => b.disabled = true);

      if (i === quizData.correcta) {
        btn.classList.add('correct');
        elements.quizFeedbackBadge.className = 'feedback-badge correct';
        elements.quizFeedbackBadge.textContent = '¡Respuesta Correcta!';
      } else {
        btn.classList.add('incorrect');
        const correctBtn = document.querySelectorAll('.quiz-option-btn')[quizData.correcta];
        if (correctBtn) correctBtn.classList.add('correct');
        elements.quizFeedbackBadge.className = 'feedback-badge incorrect';
        elements.quizFeedbackBadge.textContent = 'Respuesta Incorrecta';
      }

      elements.quizFeedbackText.textContent = quizData.explicacion;
      elements.quizFeedbackBox.style.display = 'flex';
    });

    elements.quizOptionsList.appendChild(btn);
  });
}

/* ==========================================================================
   MODAL DE INSPECCIÓN JSON ESTRUCTURADO
   ========================================================================== */
function openJsonModal(jsonData, title) {
  elements.jsonModalTitle.textContent = title || 'JSON Estructurado (Respuesta RAG)';
  elements.jsonCodeDisplay.textContent = JSON.stringify(jsonData, null, 2);
  elements.btnCopyJson.textContent = 'Copiar JSON';
  elements.btnCopyJson.classList.remove('copied');

  elements.jsonModal.style.display = 'flex';
  state.isJsonModalOpen = true;
}

function closeJsonModal() {
  elements.jsonModal.style.display = 'none';
  state.isJsonModalOpen = false;
}

function copyJsonToClipboard() {
  const jsonText = elements.jsonCodeDisplay.textContent;
  navigator.clipboard.writeText(jsonText).then(() => {
    elements.btnCopyJson.textContent = '✓ ¡Copiado!';
    elements.btnCopyJson.classList.add('copied');
    setTimeout(() => {
      elements.btnCopyJson.textContent = 'Copiar JSON';
      elements.btnCopyJson.classList.remove('copied');
    }, 2000);
  });
}

// Retorna el objeto JSON del tópico actual
function getStructuredJsonForTopic(topicKey) {
  const t = mockDatabase[topicKey];
  if (!t) return {};

  return {
    "status": "success",
    "metadatos": {
      "document_id": `doc_${topicKey}_2026`,
      "pilar": topicKey,
      "titulo": t.titulo,
      "tiempo_estudio": t.metadatos?.tiempo_estudio,
      "anclaje_rag": t.metadatos?.anclaje_rag
    },
    "evaluacion_calidad": {
      "fidelidad_fuente": 0.99,
      "coherencia_pedagogica": 0.98,
      "score_global": 0.985
    },
    "almacenamiento_oci": {
      "bucket": "nuevamente-processed-docs",
      "path": `oci://bucket-nuevamente/pilares/${topicKey}.json`,
      "status": "persisted_always_free"
    },
    "contenido_adaptado": {
      "titulo": t.titulo,
      "flashcards": t.flashcards,
      "sintesis": t.sintesis,
      "video": t.video,
      "quiz": t.quiz
    }
  };
}