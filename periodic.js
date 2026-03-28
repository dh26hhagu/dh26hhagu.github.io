// ===== CONSTANTS =====
const OLD_GROUP_LABELS = {
  1: 'IA', 2: 'IIA', 3: 'IIIB', 4: 'IVB', 5: 'VB',
  6: 'VIB', 7: 'VIIB', 8: 'VIIIB', 9: 'VIIIB', 10: 'VIIIB',
  11: 'IB', 12: 'IIB', 13: 'IIIA', 14: 'IVA',
  15: 'VA', 16: 'VIA', 17: 'VIIA', 18: 'VIIIA'
};

const CATEGORY_CLASS = {
  'alkali metal': 'alkali-metal',
  'alkaline earth metal': 'alkaline-earth-metal',
  'transition metal': 'transition-metal',
  'post-transition metal': 'post-transition-metal',
  metalloid: 'metalloid',
  nonmetal: 'nonmetal',
  halogen: 'halogen',
  'noble gas': 'noble-gas',
  lanthanide: 'lanthanide',
  actinide: 'actinide'
};

const SUPERSCRIPT_MAP = {
  '⁰': '0','¹': '1','²': '2','³': '3','⁴': '4',
  '⁵': '5','⁶': '6','⁷': '7','⁸': '8','⁹': '9'
};

// ===== DOM =====
const periodicGrid = document.getElementById('periodic-grid');
const detailPanel = document.getElementById('detail-panel');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const countInfo = document.getElementById('count-info');

// ===== STATE =====
let elements = [];
let elementsMap = new Map();
let lockedElement = null;

// ===== UTILS =====
const escapeHtml = (str) =>
  String(str ?? '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#39;");

function format(value, suffix='') {
  if (value === null || value === undefined || value === '') return 'Unknown';
  return value + suffix;
}

function electronConfigToHtml(config='') {
  let result = '';
  for (let c of config) {
    if (SUPERSCRIPT_MAP[c]) {
      result += `<sup>${SUPERSCRIPT_MAP[c]}</sup>`;
    } else {
      result += escapeHtml(c);
    }
  }
  return result || 'Unknown';
}

// ===== GRID POSITION =====
function getPosition(el) {
  if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
    return { row: 9, col: el.atomicNumber - 54 };
  }
  if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
    return { row: 10, col: el.atomicNumber - 86 };
  }
  return { row: el.period + 1, col: el.group + 1 };
}

// ===== BUILD GRID =====
function buildGridSkeleton() {
  periodicGrid.innerHTML = '';

  // Corner
  const corner = document.createElement('div');
  corner.className = 'corner-cell';
  corner.innerHTML = '<span>Period</span><span>Group</span>';
  corner.style.gridRow = '1';
  corner.style.gridColumn = '1';
  periodicGrid.appendChild(corner);

  // Groups
  for (let g = 1; g <= 18; g++) {
    const cell = document.createElement('div');
    cell.className = 'group-label';
    cell.style.gridRow = '1';
    cell.style.gridColumn = g + 1;
    cell.innerHTML = `<div>${g}</div><small>${OLD_GROUP_LABELS[g]}</small>`;
    periodicGrid.appendChild(cell);
  }

  // Periods
  for (let p = 1; p <= 7; p++) {
    const cell = document.createElement('div');
    cell.className = 'period-label';
    cell.style.gridRow = p + 1;
    cell.style.gridColumn = '1';
    cell.textContent = p;
    periodicGrid.appendChild(cell);
  }
}

// ===== DETAIL PANEL =====
function updateDetail(el, animate=false) {
  if (!el) return;

  detailPanel.innerHTML = `
    <h2>${escapeHtml(el.name)} (${escapeHtml(el.symbol)})</h2>
    <div class="detail-grid">
      <div>Atomic Number</div><div>${el.atomicNumber}</div>
      <div>Group</div><div>${el.group} (${OLD_GROUP_LABELS[el.group]})</div>
      <div>Period</div><div>${el.period}</div>
      <div>Category</div><div>${el.category}</div>
      <div>Electron</div><div>${electronConfigToHtml(el.electronConfiguration)}</div>
      <div>Electronegativity</div><div>${format(el.electronegativity)}</div>
      <div>Melting</div><div>${format(el.meltingPoint,' °C')}</div>
      <div>Boiling</div><div>${format(el.boilingPoint,' °C')}</div>
    </div>
  `;

  if (animate) {
    detailPanel.classList.remove('fade');
    void detailPanel.offsetWidth;
    detailPanel.classList.add('fade');
  }
}

// ===== ACTIVE STYLE =====
function updateActiveTile() {
  document.querySelectorAll('.element')
    .forEach(el => el.classList.remove('active'));

  if (!lockedElement) return;

  const tile = document.querySelector(
    `[data-id="${lockedElement.atomicNumber}"]`
  );
  if (tile) tile.classList.add('active');
}

// ===== RENDER =====
function render() {
  buildGridSkeleton();

  const filtered = elements.filter(el => {
    const q = searchInput.value.toLowerCase();
    const c = categoryFilter.value;

    return (
      (!q || el.name.toLowerCase().includes(q) || el.symbol.toLowerCase().includes(q)) &&
      (c === 'all' || el.category === c)
    );
  });

  filtered.forEach(el => {
    const pos = getPosition(el);

    const tile = document.createElement('button');
    tile.className = `element ${CATEGORY_CLASS[el.category] || ''}`;
    tile.style.gridRow = pos.row;
    tile.style.gridColumn = pos.col;
    tile.dataset.id = el.atomicNumber;

    tile.innerHTML = `
      <span>${el.atomicNumber}</span>
      <strong>${el.symbol}</strong>
      <small>${el.name}</small>
    `;

    periodicGrid.appendChild(tile);
  });

  countInfo.textContent = `${filtered.length}/118`;

  // Reset lock nếu bị filter mất
  if (lockedElement && !filtered.find(e => e.atomicNumber === lockedElement.atomicNumber)) {
    lockedElement = null;
  }

  updateActiveTile();
  updateDetail(lockedElement || filtered[0]);
}

// ===== EVENTS =====
function bindEvents() {

  // HOVER (mượt, không bug)
  periodicGrid.addEventListener('pointerover', e => {
    const tile = e.target.closest('.element');
    if (!tile || lockedElement) return;

    const el = elementsMap.get(Number(tile.dataset.id));
    if (el) updateDetail(el);
  });

  // CLICK (LOCK)
  periodicGrid.addEventListener('click', e => {
    const tile = e.target.closest('.element');
    if (!tile) return;

    const el = elementsMap.get(Number(tile.dataset.id));
    if (!el) return;

    // toggle
    if (lockedElement && lockedElement.atomicNumber === el.atomicNumber) {
      lockedElement = null;
    } else {
      lockedElement = el;
    }

    updateActiveTile();
    updateDetail(lockedElement || el, true);
  });

  // SEARCH debounce
  let t;
  searchInput.addEventListener('input', () => {
    clearTimeout(t);
    t = setTimeout(render, 120);
  });

  categoryFilter.addEventListener('change', render);
}

// ===== INIT =====
async function init() {
  try {
    const res = await fetch('periodic-data.json');
    const data = await res.json();

    elements = data;
    elementsMap = new Map(data.map(e => [e.atomicNumber, e]));

    bindEvents();
    render();

  } catch (err) {
    detailPanel.innerHTML = "Lỗi load dữ liệu";
    console.error(err);
  }
}

init();
