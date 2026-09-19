// app.js - Control del Cuaderno Interactivo con Zoom y Flashcards
import { mockDatabase } from './mockData.js';

// Estado de la Aplicación
const state = {
  currentSector: null, // 'frontend', 'backend', 'datascience', 'devops'
  deck: [],
  currentIndex: 0,
  isFlipped: false,
  isZoomed: false,
  apiMode: 'mock',
  backendUrl: 'http://localhost:8000/api/adaptar',
  theme: localStorage.getItem('nuevamente-theme') || 'dark'
};

// Elementos del DOM
const elements = {
  btnTheme: document.getElementById('btnTheme'),
  themeBtnText: document.getElementById('themeBtnText'),
  apiModeSelector: document.getElementById('apiModeSelector'),
  
  // Pantalla de Inicio
  welcomeScreen: document.getElementById('welcomeScreen'),
  welcomeViewport: document.getElementById('welcomeViewport'),
  btnOpenNotebook: document.getElementById('btnOpenNotebook'),
  mainDeskContainer: document.getElementById('mainDeskContainer'),
  btnCloseNotebook: document.getElementById('btnCloseNotebook'),

  // Controles de Cámara y Zoom
  notebookCamera: document.getElementById('notebookCamera'),
  deskViewport: document.getElementById('deskViewport'),
  btnZoomOut: document.getElementById('btnZoomOut'),
  guideText: document.getElementById('guideText'),
  hotspots: document.querySelectorAll('.quadrant-hotspot'),

  // Flashcard Integrada
  cardContainer: document.getElementById('inPlaceCardContainer'),
  cardElement: document.getElementById('currentCard'),
  cardSectorPill: document.getElementById('cardSectorPill'),
  cardProgressTop: document.getElementById('cardProgressTop'),
  cardFrontText: document.getElementById('cardFrontText'),
  cardBackText: document.getElementById('cardBackText'),
  cardHintText: document.getElementById('cardHintText'),

  // Controles de Baraja
  deckControls: document.getElementById('deckControls'),
  btnPrev: document.getElementById('btnPrev'),
  btnNext: document.getElementById('btnNext'),
  btnFlip: document.getElementById('btnFlip'),
  cardCounter: document.getElementById('cardCounter'),

  // OCI y Overlay
  ociStatusText: document.getElementById('ociStatusText'),
  qualityScoreText: document.getElementById('qualityScoreText'),
  loadingOverlay: document.getElementById('loadingOverlay'),
  loadingStatusText: document.getElementById('loadingStatusText')
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupEventListeners();
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

function openNotebook() {
  elements.welcomeScreen.style.display = 'none';
  elements.mainDeskContainer.style.display = 'flex';
}

function closeNotebook() {
  unzoomNotebook();
  elements.mainDeskContainer.style.display = 'none';
  elements.welcomeScreen.style.display = 'flex';
}

function setupEventListeners() {
  // Abrir y cerrar cuaderno
  elements.btnOpenNotebook.addEventListener('click', (e) => {
    e.stopPropagation();
    openNotebook();
  });
  elements.welcomeViewport.addEventListener('click', openNotebook);
  elements.btnCloseNotebook.addEventListener('click', closeNotebook);

  // Cambio de tema
  elements.btnTheme.addEventListener('click', toggleTheme);

  // Selector de Modo API
  elements.apiModeSelector.addEventListener('change', (e) => {
    state.apiMode = e.target.value;
  });

  // Clic en los 4 cuadrantes del cuaderno
  elements.hotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      const sector = hotspot.getAttribute('data-sector');
      focusSector(sector);
    });
  });

  // Botón para volver al cuaderno completo
  elements.btnZoomOut.addEventListener('click', unzoomNotebook);

  // Voltear tarjeta
  elements.cardElement.addEventListener('click', flipCard);
  elements.btnFlip.addEventListener('click', flipCard);

  // Navegación
  elements.btnPrev.addEventListener('click', goToPrevCard);
  elements.btnNext.addEventListener('click', goToNextCard);

  // Atajos de teclado
  document.addEventListener('keydown', (e) => {
    if (!state.isZoomed) return;

    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      flipCard();
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      goToNextCard();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      goToPrevCard();
    } else if (e.code === 'Escape') {
      unzoomNotebook();
    }
  });
}

// Enfocar un cuadrante con zoom cinemático
async function focusSector(sector) {
  state.currentSector = sector;
  state.isZoomed = true;

  // Actualizar textos de ayuda
  const sectorNames = {
    frontend: 'Frontend (HTML, CSS, React)',
    backend: 'Backend (Node, Python, SQL)',
    datascience: 'Data Science, IA & Machine Learning',
    devops: 'DevOps, CI/CD & Oracle Cloud'
  };
  elements.guideText.innerHTML = `🔍 Estudiando: <b>${sectorNames[sector]}</b>. Usa los controles o presiona <b>Espacio</b> para voltear.`;
  elements.btnZoomOut.style.display = 'inline-block';

  // Aplicar clase de zoom a la cámara
  elements.notebookCamera.className = `notebook-camera zoom-${sector}`;

  // Activar la tarjeta flotante nítida
  setTimeout(() => {
    elements.cardContainer.classList.add('active');
  }, 200);

  // Mostrar controles de flashcard
  elements.deckControls.style.display = 'flex';

  // Cargar las preguntas del sector seleccionado
  loadDeckForSector(sector);
}

// Volver a la vista panorámica del cuaderno
function unzoomNotebook() {
  state.isZoomed = false;
  state.currentSector = null;

  // Desvanecer tarjeta y restaurar cámara
  elements.cardContainer.classList.remove('active');
  elements.notebookCamera.className = 'notebook-camera';
  elements.deckControls.style.display = 'none';
  elements.btnZoomOut.style.display = 'none';

  elements.guideText.innerHTML = '👆 <b>Haz clic en cualquier cuadrante del cuaderno</b> (Frontend, Backend, Data Science o DevOps) para enfocar y estudiar sus Flashcards.';
}

function loadDeckForSector(sector) {
  const mockKeys = {
    frontend: 'web-principiante',
    backend: 'web-principiante',
    datascience: 'ia-principiante',
    devops: 'devops-principiante'
  };

  const data = mockDatabase[mockKeys[sector]] || mockDatabase['ia-principiante'];
  state.deck = data.contenido_adaptado.items || [];
  state.currentIndex = 0;

  elements.cardSectorPill.textContent = sector.toUpperCase();
  renderCard(0);
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
  elements.cardHintText.textContent = card.pista_didactica || 'Analogía didáctica para memorizar.';

  const total = state.deck.length;
  const currentNum = index + 1;
  elements.cardProgressTop.textContent = `${currentNum} / ${total}`;
  elements.cardCounter.textContent = `Tarjeta ${currentNum} de ${total}`;

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