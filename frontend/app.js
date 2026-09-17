// app.js - Lógica, interactividad y temas para NuevaMente
import { mockDatabase } from './mockData.js';

// Estado de la aplicación
const state = {
  deck: [],
  currentIndex: 0,
  metadata: null,
  isFlipped: false,
  apiMode: 'mock', // 'mock' o 'real'
  backendUrl: 'http://localhost:8000/api/adaptar',
  theme: localStorage.getItem('nuevamente-theme') || 'dark',
  palette: localStorage.getItem('nuevamente-palette') || 'amber'
};

// Elementos del DOM
const elements = {
  // Temas y Paletas
  btnTheme: document.getElementById('btnTheme'),
  themeBtnText: document.getElementById('themeBtnText'),
  paletteSelector: document.getElementById('paletteSelector'),

  // Formulario y Parámetros
  form: document.getElementById('adaptForm'),
  btnGenerar: document.getElementById('btnGenerar'),
  nichoSector: document.getElementById('nichoSector'),
  perfilDestinatario: document.getElementById('perfilDestinatario'),
  formatoSalida: document.getElementById('formatoSalida'),
  nivelDetalle: document.getElementById('nivelDetalle'),
  docContenido: document.getElementById('docContenido'),
  apiModeSelector: document.getElementById('apiModeSelector'),

  // Metadatos
  metaBanner: document.getElementById('metaBanner'),
  metaTitle: document.getElementById('metaTitle'),
  metaIntro: document.getElementById('metaIntro'),
  badgePerfil: document.getElementById('badgePerfil'),
  badgeTiempo: document.getElementById('badgeTiempo'),
  conceptChips: document.getElementById('conceptChips'),
  deckProgressBar: document.getElementById('deckProgressBar'),

  // Flashcard
  cardElement: document.getElementById('currentCard'),
  cardFrontText: document.getElementById('cardFrontText'),
  cardBackText: document.getElementById('cardBackText'),
  cardHintText: document.getElementById('cardHintText'),
  cardProgressTop: document.getElementById('cardProgressTop'),
  cardCounter: document.getElementById('cardCounter'),

  // Controles
  btnPrev: document.getElementById('btnPrev'),
  btnNext: document.getElementById('btnNext'),
  btnFlip: document.getElementById('btnFlip'),

  // Estado del sistema & OCI
  ociStatusText: document.getElementById('ociStatusText'),
  qualityScoreText: document.getElementById('qualityScoreText'),

  // Overlay de carga
  loadingOverlay: document.getElementById('loadingOverlay'),
  loadingStatusText: document.getElementById('loadingStatusText')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initThemeAndPalette();
  setupEventListeners();
  // Cargar contenido inicial (IA - Fundamentos)
  loadContentData(mockDatabase['ia-principiante']);
});

function initThemeAndPalette() {
  // Aplicar tema
  applyTheme(state.theme);

  // Aplicar paleta
  applyPalette(state.palette);
  if (elements.paletteSelector) {
    elements.paletteSelector.value = state.palette;
  }
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nuevamente-theme', theme);

  if (theme === 'dark') {
    elements.themeBtnText.textContent = 'Modo Claro';
  } else {
    elements.themeBtnText.textContent = 'Modo Oscuro';
  }
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

function applyPalette(palette) {
  state.palette = palette;
  document.documentElement.setAttribute('data-palette', palette);
  localStorage.setItem('nuevamente-palette', palette);
}

function setupEventListeners() {
  // Cambio de tema
  elements.btnTheme.addEventListener('click', toggleTheme);

  // Cambio de paleta de colores
  if (elements.paletteSelector) {
    elements.paletteSelector.addEventListener('change', (e) => {
      applyPalette(e.target.value);
    });
  }

  // Manejo de volteo de tarjeta
  elements.cardElement.addEventListener('click', flipCard);
  elements.btnFlip.addEventListener('click', flipCard);

  // Navegación
  elements.btnPrev.addEventListener('click', goToPrevCard);
  elements.btnNext.addEventListener('click', goToNextCard);

  // Cambio de modo Mock / Backend Real
  elements.apiModeSelector.addEventListener('change', (e) => {
    state.apiMode = e.target.value;
    console.log(`Modo de conexión cambiado a: ${state.apiMode}`);
  });

  // Envío del formulario
  elements.form.addEventListener('submit', handleFormSubmit);

  // Atajos de teclado (Espacio para voltear, Flechas para avanzar)
  document.addEventListener('keydown', (e) => {
    if (['TEXTAREA', 'INPUT', 'SELECT'].includes(document.activeElement.tagName)) return;

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
  });
}

function flipCard() {
  state.isFlipped = !state.isFlipped;
  if (state.isFlipped) {
    elements.cardElement.classList.add('flipped');
  } else {
    elements.cardElement.classList.remove('flipped');
  }
}

function renderCard(index) {
  if (!state.deck || state.deck.length === 0) return;

  state.isFlipped = false;
  elements.cardElement.classList.remove('flipped');

  const card = state.deck[index];
  elements.cardFrontText.textContent = card.frente;
  elements.cardBackText.textContent = card.dorso;
  elements.cardHintText.textContent = card.pista_didactica || 'Reflexiona sobre cómo se aplica esto en la práctica cotidiana.';

  // Actualizar indicadores numéricos y barra de progreso
  const total = state.deck.length;
  const currentNum = index + 1;
  elements.cardProgressTop.textContent = `${currentNum} / ${total}`;
  elements.cardCounter.textContent = `Tarjeta ${currentNum} de ${total}`;

  const progressPercent = (currentNum / total) * 100;
  elements.deckProgressBar.style.width = `${progressPercent}%`;

  // Gestionar botones de navegación
  elements.btnPrev.disabled = index === 0;
  elements.btnNext.disabled = index === total - 1;
}

function goToNextCard() {
  if (state.currentIndex < state.deck.length - 1) {
    state.currentIndex++;
    renderCard(state.currentIndex);
  }
}

function goToPrevCard() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderCard(state.currentIndex);
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const payload = {
    documento_titulo: "Documentación Seleccionada",
    documento_contenido: elements.docContenido.value || "Contenido base del nicho seleccionado.",
    perfil_destinatario: elements.perfilDestinatario.value,
    formato_salida: elements.formatoSalida.value,
    nicho_sector: elements.nichoSector.value,
    nivel_detalle: elements.nivelDetalle.value
  };

  showLoading(true);

  try {
    let resultData;

    if (state.apiMode === 'mock') {
      await simulateProgressStages();
      const selectedKey = elements.nichoSector.value;
      resultData = mockDatabase[selectedKey] || mockDatabase['ia-principiante'];
    } else {
      elements.loadingStatusText.textContent = "Conectando con Backend FastAPI y RAG...";
      const response = await fetch(state.backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Error en servidor: ${response.status} ${response.statusText}`);
      }

      resultData = await response.json();
    }

    loadContentData(resultData);

  } catch (error) {
    console.error("Error al generar:", error);
    alert(`Ocurrió un error: ${error.message}\n\nSi estás en modo Backend Real, asegúrate de que el servidor FastAPI esté corriendo en ${state.backendUrl}.`);
  } finally {
    showLoading(false);
  }
}

function loadContentData(data) {
  if (!data || !data.contenido_adaptado) return;

  elements.metaTitle.textContent = data.contenido_adaptado.titulo;
  elements.metaIntro.textContent = data.contenido_adaptado.introduccion_contextualizada;
  elements.badgePerfil.textContent = data.metadatos.perfil_aplicado;
  elements.badgeTiempo.textContent = `${data.metadatos.tiempo_estimado_estudio_minutos} min`;

  // Cargar conceptos clave
  elements.conceptChips.innerHTML = '';
  if (data.metadatos.conceptos_clave) {
    data.metadatos.conceptos_clave.forEach(concepto => {
      const chip = document.createElement('span');
      chip.className = 'concept-chip';
      chip.textContent = concepto;
      elements.conceptChips.appendChild(chip);
    });
  }

  // Cargar Baraja
  state.deck = data.contenido_adaptado.items || [];
  state.currentIndex = 0;
  renderCard(0);

  // Actualizar indicadores OCI y Calidad
  if (data.evaluacion_calidad) {
    const scorePorc = Math.round((data.evaluacion_calidad.anclaje_fuente_score || 0.95) * 100);
    elements.qualityScoreText.textContent = `Score Anclaje RAG: ${scorePorc}% | Claridad: ${data.evaluacion_calidad.claridad_pedagogica || 'Alta'}`;
  }

  if (data.almacenamiento_oci) {
    elements.ociStatusText.textContent = `OCI Object Storage: Objeto '${data.almacenamiento_oci.objeto_id}' en bucket '${data.almacenamiento_oci.bucket}' (${data.almacenamiento_oci.status_upload})`;
  }
}

function showLoading(show) {
  if (show) {
    elements.loadingOverlay.classList.add('active');
  } else {
    elements.loadingOverlay.classList.remove('active');
  }
}

async function simulateProgressStages() {
  const steps = [
    "Leyendo y limpiando texto técnico...",
    "Segmentando chunks semánticos (RAG)...",
    "Calculando embeddings vectoriales...",
    "Orquestando Agente Pedagógico para Flashcards...",
    "Verificando anclaje y mitigando alucinaciones...",
    "Guardando copia en OCI Object Storage..."
  ];

  for (const step of steps) {
    elements.loadingStatusText.textContent = step;
    await new Promise(r => setTimeout(r, 260));
  }
}
