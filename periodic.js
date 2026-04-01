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

const VALID_CATEGORIES = new Set(Object.keys(CATEGORY_CLASS));
const VALID_BLOCKS = new Set(['s', 'p', 'd', 'f']);
const SUPERSCRIPT_MAP = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9'
};
const REQUIRED_NAMES_BY_ATOMIC_NUMBER = {
  13: 'Aluminium',
  16: 'Sulfur',
  55: 'Cesium'
};

// ===== DOM =====
const periodicGrid = document.getElementById('periodic-table');
const detailPanel = document.getElementById('detail-panel');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const countInfo = document.getElementById('count-info');

// ===== STATE =====
let elements = [];
let filteredElements = [];
let elementByAtomicNumber = new Map();
let lockedAtomicNumber = null;
let hoveredTile = null;
let searchDebounceId = null;

// ===== UTILS =====
const escapeHtml = (str) =>
  String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

function formatValue(value, suffix = '') {
  if (value === null || value === undefined || value === '') return 'Unknown';
  return `${value}${suffix}`;
}

function capitalizeWords(str) {
  return String(str || '').replace(/\b\w/g, (char) => char.toUpperCase());
}

function electronConfigToHtml(config = '') {
  return String(config)
    .split('')
    .map((char) => (SUPERSCRIPT_MAP[char] ? `<sup>${SUPERSCRIPT_MAP[char]}</sup>` : escapeHtml(char)))
    .join('') || 'Unknown';
}

function normalizeCategory(value) {
  return String(value ?? '').trim().toLowerCase();
}

function getElementData(atomicNumber) {
  return elementByAtomicNumber.get(Number(atomicNumber)) || null;
}

function getCurrentFilters() {
  return {
    query: searchInput.value.trim().toLowerCase(),
    category: categoryFilter.value
  };
}

function getFilteredElements(filters = getCurrentFilters()) {
  const { query, category } = filters;

  return elements.filter((element) => {
    const searchable = `${element.atomicNumber} ${element.name.toLowerCase()} ${element.symbol.toLowerCase()}`;
    const matchesText = !query || searchable.includes(query);
    const matchesCategory = category === 'all' || element.category === category;
    return matchesText && matchesCategory;
  });
}

function getFirstFilteredElement() {
  return filteredElements[0] || null;
}

function getDetailTarget() {
  return lockedAtomicNumber ? getElementData(lockedAtomicNumber) : getFirstFilteredElement();
}

// ===== DATA VALIDATION =====
function validateAndNormalizeData(rawData) {
  if (!Array.isArray(rawData)) {
    throw new Error('Invalid periodic-data.json format: expected an array.');
  }

  const seenAtomicNumbers = new Set();
  const normalizedData = rawData.map((item) => {
    const entry = {
      ...item,
      name: String(item.name ?? '').trim(),
      symbol: String(item.symbol ?? '').trim(),
      category: normalizeCategory(item.category),
      meltingPoint: item.meltingPoint ?? null,
      boilingPoint: item.boilingPoint ?? null
    };

    if (!Number.isInteger(entry.atomicNumber) || entry.atomicNumber < 1 || entry.atomicNumber > 118) {
      throw new Error(`Invalid atomicNumber: ${entry.atomicNumber}`);
    }
    if (seenAtomicNumbers.has(entry.atomicNumber)) {
      throw new Error(`Duplicate atomicNumber detected: ${entry.atomicNumber}`);
    }
    seenAtomicNumbers.add(entry.atomicNumber);

    if (!/^[A-Z][a-z]?$/.test(entry.symbol)) {
      throw new Error(`Invalid symbol for atomic number ${entry.atomicNumber}: ${entry.symbol}`);
    }
    if (!/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(entry.name)) {
      throw new Error(`Invalid name for atomic number ${entry.atomicNumber}: ${entry.name}`);
    }
    if (REQUIRED_NAMES_BY_ATOMIC_NUMBER[entry.atomicNumber] && REQUIRED_NAMES_BY_ATOMIC_NUMBER[entry.atomicNumber] !== entry.name) {
      throw new Error(`Unexpected IUPAC name for atomic number ${entry.atomicNumber}: ${entry.name}`);
    }
    if (!(typeof entry.atomicMass === 'number' || typeof entry.atomicMass === 'string')) {
      throw new Error(`Invalid atomicMass for atomic number ${entry.atomicNumber}`);
    }
    if (!(entry.group === null || (Number.isInteger(entry.group) && entry.group >= 1 && entry.group <= 18))) {
      throw new Error(`Invalid group for atomic number ${entry.atomicNumber}: ${entry.group}`);
    }
    if (!Number.isInteger(entry.period) || entry.period < 1 || entry.period > 7) {
      throw new Error(`Invalid period for atomic number ${entry.atomicNumber}: ${entry.period}`);
    }
    if (!VALID_BLOCKS.has(entry.block)) {
      throw new Error(`Invalid block for atomic number ${entry.atomicNumber}: ${entry.block}`);
    }
    if (!VALID_CATEGORIES.has(entry.category)) {
      throw new Error(`Invalid category for atomic number ${entry.atomicNumber}: ${entry.category}`);
    }

    return entry;
  });

  for (let atomicNumber = 1; atomicNumber <= 118; atomicNumber += 1) {
    if (!seenAtomicNumbers.has(atomicNumber)) {
      throw new Error(`Missing atomicNumber ${atomicNumber}`);
    }
  }

  return normalizedData.sort((a, b) => a.atomicNumber - b.atomicNumber);
}

// ===== GRID POSITION =====
function getPosition(element) {
  if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
    return { row: 9, col: element.atomicNumber - 54 };
  }
  if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
    return { row: 10, col: element.atomicNumber - 86 };
  }
  if (element.group === null) return null;

  return { row: element.period + 1, col: element.group + 1 };
}

// ===== BUILDERS =====
function buildGridSkeleton(fragment) {
  const corner = document.createElement('div');
  corner.className = 'corner-cell';
  corner.innerHTML = '<span>Period</span><span>Group</span>';
  corner.style.gridRow = '1';
  corner.style.gridColumn = '1';
  fragment.appendChild(corner);

  for (let group = 1; group <= 18; group += 1) {
    const cell = document.createElement('div');
    cell.className = 'group-label';
    cell.style.gridRow = '1';
    cell.style.gridColumn = String(group + 1);
    cell.innerHTML = `<div>${group}</div><small>${OLD_GROUP_LABELS[group]}</small>`;
    fragment.appendChild(cell);
  }

  for (let period = 1; period <= 7; period += 1) {
    const cell = document.createElement('div');
    cell.className = 'period-label';
    cell.style.gridRow = String(period + 1);
    cell.style.gridColumn = '1';
    cell.textContent = String(period);
    fragment.appendChild(cell);
  }

  const lanthanideLabel = document.createElement('div');
  lanthanideLabel.className = 'f-block-label';
  lanthanideLabel.style.gridRow = '9';
  lanthanideLabel.style.gridColumn = '1';
  lanthanideLabel.textContent = 'Lanthanides';
  fragment.appendChild(lanthanideLabel);

  const actinideLabel = document.createElement('div');
  actinideLabel.className = 'f-block-label';
  actinideLabel.style.gridRow = '10';
  actinideLabel.style.gridColumn = '1';
  actinideLabel.textContent = 'Actinides';
  fragment.appendChild(actinideLabel);
}

function buildElementTile(element) {
  const position = getPosition(element);
  if (!position) return null;

  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = `element ${CATEGORY_CLASS[element.category] || ''}`;
  tile.style.gridRow = String(position.row);
  tile.style.gridColumn = String(position.col);
  tile.dataset.atomicNumber = String(element.atomicNumber);
  tile.setAttribute('aria-label', `${element.name} (${element.symbol}), atomic number ${element.atomicNumber}`);

  tile.innerHTML = `
    <span class="atomic-number">${element.atomicNumber}</span>
    <strong class="symbol">${escapeHtml(element.symbol)}</strong>
    <small class="element-name" title="${escapeHtml(element.name)}">${escapeHtml(element.name)}</small>
    <small class="mass" title="${escapeHtml(String(element.atomicMass))}">${escapeHtml(String(element.atomicMass))}</small>
  `;

  return tile;
}

// ===== DETAIL PANEL =====
function updateDetailPanel(element, animate = false) {
  if (!element) {
    detailPanel.innerHTML = '<h2>No match</h2><p>Try another search/filter.</p>';
    return;
  }

  const groupText = element.group ? `${element.group} (${OLD_GROUP_LABELS[element.group]})` : 'N/A';

  detailPanel.innerHTML = `
    <h2>${escapeHtml(element.name)} (${escapeHtml(element.symbol)})</h2>
    <div class="detail-grid">
      <div class="label">Atomic Number</div><div>${element.atomicNumber}</div>
      <div class="label">Group</div><div>${groupText}</div>
      <div class="label">Period</div><div>${element.period}</div>
      <div class="label">Block</div><div>${escapeHtml(element.block.toUpperCase())}</div>
      <div class="label">Category</div><div>${escapeHtml(capitalizeWords(element.category))}</div>
      <div class="label">Atomic Mass</div><div>${escapeHtml(String(element.atomicMass))}</div>
      <div class="label">Electron</div><div>${electronConfigToHtml(element.electronConfiguration)}</div>
      <div class="label">Electronegativity</div><div>${formatValue(element.electronegativity)}</div>
      <div class="label">Melting</div><div>${formatValue(element.meltingPoint, ' °C')}</div>
      <div class="label">Boiling</div><div>${formatValue(element.boilingPoint, ' °C')}</div>
    </div>
  `;

  if (animate) {
    detailPanel.classList.remove('panel-transition');
    void detailPanel.offsetWidth;
    detailPanel.classList.add('panel-transition');
  }
}

function updateActiveTile() {
  periodicGrid.querySelectorAll('.element.active').forEach((node) => node.classList.remove('active'));

  if (!lockedAtomicNumber) return;

  const tile = periodicGrid.querySelector(`[data-atomic-number="${lockedAtomicNumber}"]`);
  if (tile) tile.classList.add('active');
}

function setHoveredTile(tile) {
  if (hoveredTile === tile) return;

  if (hoveredTile) hoveredTile.classList.remove('hovered');
  hoveredTile = tile || null;
  if (hoveredTile) hoveredTile.classList.add('hovered');
}

// ===== RENDER =====
function renderTable() {
  console.log('render check');

  filteredElements = getFilteredElements();

  const fragment = document.createDocumentFragment();
  buildGridSkeleton(fragment);
  filteredElements.forEach((element) => {
    const tile = buildElementTile(element);
    if (tile) fragment.appendChild(tile);
  });

  periodicGrid.replaceChildren(fragment);
  countInfo.textContent = `${filteredElements.length}/118`;

  if (lockedAtomicNumber && !filteredElements.some((element) => element.atomicNumber === lockedAtomicNumber)) {
    lockedAtomicNumber = null;
  }

  setHoveredTile(null);
  updateActiveTile();
  updateDetailPanel(getDetailTarget());
}

// ===== EVENTS =====
function handleHover(tile, data) {
  if (!data || lockedAtomicNumber) return;

  console.log('hover event');
  setHoveredTile(tile);
  updateDetailPanel(data, true);
}

function handleClick(tile, data) {
  if (!data) return;

  console.log('click event');
  if (lockedAtomicNumber === data.atomicNumber) {
    lockedAtomicNumber = null;
    setHoveredTile(null);
    tile.classList.remove('active');
    updateActiveTile();
    updateDetailPanel(getDetailTarget(), true);
    return;
  }

  lockedAtomicNumber = data.atomicNumber;
  setHoveredTile(tile);
  updateActiveTile();
  updateDetailPanel(data, true);
}

function bindEvents() {
  periodicGrid.addEventListener('mouseover', (event) => {
    const tile = event.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;

    handleHover(tile, getElementData(tile.dataset.atomicNumber));
  });

  periodicGrid.addEventListener('mouseout', (event) => {
    const tile = event.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;

    const relatedTile = event.relatedTarget?.closest?.('.element');
    if (relatedTile === tile) return;

    setHoveredTile(null);
    if (!lockedAtomicNumber) {
      updateDetailPanel(getFirstFilteredElement());
    }
  });

  periodicGrid.addEventListener('click', (event) => {
    const tile = event.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;

    handleClick(tile, getElementData(tile.dataset.atomicNumber));
  });

  periodicGrid.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const tile = event.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;

    event.preventDefault();
    handleClick(tile, getElementData(tile.dataset.atomicNumber));
  });

  searchInput.addEventListener('input', () => {
    clearTimeout(searchDebounceId);
    searchDebounceId = setTimeout(renderTable, 120);
  });

  categoryFilter.addEventListener('change', renderTable);
}

// ===== INIT =====
async function init() {
  try {
    const response = await fetch('periodic-data.json');
    const data = await response.json();

    elements = validateAndNormalizeData(data);
    elementByAtomicNumber = new Map(elements.map((element) => [element.atomicNumber, element]));

    bindEvents();
    renderTable();
  } catch (error) {
    detailPanel.innerHTML = '<h2>Failed to load data</h2><p>Check periodic-data.json structure.</p>';
    console.error(error);
  }
}

init();
