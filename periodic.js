const OLD_GROUP_LABELS = {
  1: 'IA',
  2: 'IIA',
  3: 'IIIB',
  4: 'IVB',
  5: 'VB',
  6: 'VIB',
  7: 'VIIB',
  8: 'VIIIB',
  9: 'VIIIB',
  10: 'VIIIB',
  11: 'IB',
  12: 'IIB',
  13: 'IIIA',
  14: 'IVA',
  15: 'VA',
  16: 'VIA',
  17: 'VIIA',
  18: 'VIIIA'
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

const SUPERSCRIPT_TO_NORMAL = {
  '⁰': '0',
  '¹': '1',
  '²': '2',
  '³': '3',
  '⁴': '4',
  '⁵': '5',
  '⁶': '6',
  '⁷': '7',
  '⁸': '8',
  '⁹': '9'
};

const periodicGrid = document.getElementById('periodic-grid');
const detailPanel = document.getElementById('detail-panel');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const countInfo = document.getElementById('count-info');

let lockedElement = null;
let elementsByAtomicNumber = new Map();
let allElements = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function formatValue(value, suffix = '') {
  if (value === null || value === undefined || value === '') return 'Unknown';
  return `${value}${suffix}`;
}

function electronConfigToHtml(configuration) {
  let html = '';
  for (const char of configuration || '') {
    if (SUPERSCRIPT_TO_NORMAL[char]) {
      html += `<sup>${SUPERSCRIPT_TO_NORMAL[char]}</sup>`;
    } else {
      html += escapeHtml(char);
    }
  }
  return html || 'Unknown';
}

function displayPosition(element) {
  if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
    return { row: 9, col: element.atomicNumber - 54 };
  }
  if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
    return { row: 10, col: element.atomicNumber - 86 };
  }
  return { row: element.period + 1, col: element.group + 1 };
}

function buildGridSkeleton() {
  periodicGrid.innerHTML = '';

  const corner = document.createElement('div');
  corner.className = 'corner-cell';
  corner.innerHTML = '<span>Period</span><span>Group</span>';
  corner.style.gridRow = '1';
  corner.style.gridColumn = '1';
  periodicGrid.appendChild(corner);

  for (let group = 1; group <= 18; group += 1) {
    const cell = document.createElement('div');
    cell.className = 'group-label';
    cell.style.gridRow = '1';
    cell.style.gridColumn = String(group + 1);
    cell.innerHTML = `<div>${group}</div><small>${OLD_GROUP_LABELS[group] || ''}</small>`;
    periodicGrid.appendChild(cell);
  }

  for (let period = 1; period <= 7; period += 1) {
    const cell = document.createElement('div');
    cell.className = 'period-label';
    cell.style.gridRow = String(period + 1);
    cell.style.gridColumn = '1';
    cell.textContent = String(period);
    periodicGrid.appendChild(cell);
  }

  const lanthanideLabel = document.createElement('div');
  lanthanideLabel.className = 'f-block-label';
  lanthanideLabel.style.gridRow = '9';
  lanthanideLabel.style.gridColumn = '1 / span 3';
  lanthanideLabel.textContent = 'Lanthanides';
  periodicGrid.appendChild(lanthanideLabel);

  const actinideLabel = document.createElement('div');
  actinideLabel.className = 'f-block-label';
  actinideLabel.style.gridRow = '10';
  actinideLabel.style.gridColumn = '1 / span 3';
  actinideLabel.textContent = 'Actinides';
  periodicGrid.appendChild(actinideLabel);
}

function animateDetailPanel() {
  detailPanel.classList.remove('panel-transition');
  void detailPanel.offsetWidth;
  detailPanel.classList.add('panel-transition');
}

function setActiveElementClass() {
  const tiles = periodicGrid.querySelectorAll('.element');
  tiles.forEach((tile) => tile.classList.remove('active-element'));

  if (!lockedElement) return;

  const activeTile = periodicGrid.querySelector(`.element[data-atomic-number="${lockedElement.atomicNumber}"]`);
  if (activeTile) activeTile.classList.add('active-element');
}

function buildDetailPanel(element, animate = false) {
  if (!element) return;

  const groupLabel = OLD_GROUP_LABELS[element.group] ? ` (${OLD_GROUP_LABELS[element.group]})` : '';

  detailPanel.innerHTML = `
    <h2>${escapeHtml(element.name)} (${escapeHtml(element.symbol)})</h2>
    <div class="detail-grid">
      <div class="label">Atomic Number</div><div>${formatValue(element.atomicNumber)}</div>
      <div class="label">Symbol</div><div>${escapeHtml(element.symbol)}</div>
      <div class="label">Name</div><div>${escapeHtml(element.name)}</div>
      <div class="label">Atomic Mass</div><div>${escapeHtml(String(element.atomicMass ?? 'Unknown'))}</div>
      <div class="label">Group</div><div>${formatValue(element.group)}${groupLabel}</div>
      <div class="label">Period</div><div>${formatValue(element.period)}</div>
      <div class="label">Category</div><div>${escapeHtml(element.category || 'Unknown')}</div>
      <div class="label">Block</div><div>${escapeHtml(element.block || 'Unknown')}</div>
      <div class="label">Electron Configuration</div><div>${electronConfigToHtml(element.electronConfiguration)}</div>
      <div class="label">Electronegativity (Pauling)</div><div>${formatValue(element.electronegativity)}</div>
      <div class="label">Melting Point</div><div>${formatValue(element.meltingPoint, ' °C')}</div>
      <div class="label">Boiling Point</div><div>${formatValue(element.boilingPoint, ' °C')}</div>
    </div>
  `;

  if (animate) animateDetailPanel();
}

function getElementFromTile(tile) {
  if (!tile?.dataset?.atomicNumber) return null;
  return elementsByAtomicNumber.get(Number(tile.dataset.atomicNumber)) || null;
}

function getDefaultDetailElement() {
  return allElements[0] || null;
}

function restoreDetailPanel() {
  if (lockedElement) {
    buildDetailPanel(lockedElement);
    return;
  }

  const fallbackElement = getDefaultDetailElement();
  if (fallbackElement) buildDetailPanel(fallbackElement);
}

function handleTileHover(tile) {
  if (lockedElement) return;
  const element = getElementFromTile(tile);
  if (!element) return;
  buildDetailPanel(element);
}

function handleTileClick(tile) {
  const element = getElementFromTile(tile);
  if (!element) return;

  if (lockedElement && lockedElement.atomicNumber === element.atomicNumber) {
    lockedElement = null;
    setActiveElementClass();
    restoreDetailPanel();
    return;
  }

  lockedElement = element;
  buildDetailPanel(element, true);
  setActiveElementClass();
}

function getFilteredElements(elements) {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;

  return elements.filter((element) => {
    const matchesSearch =
      query.length === 0 ||
      element.name.toLowerCase().includes(query) ||
      element.symbol.toLowerCase().includes(query) ||
      String(element.atomicNumber).includes(query);
    const matchesCategory = category === 'all' || element.category === category;

    return matchesSearch && matchesCategory;
  });
}

function renderElements(elements) {
  buildGridSkeleton();

  const filtered = getFilteredElements(elements);
  const visibleAtomicNumbers = new Set(filtered.map((element) => element.atomicNumber));

  if (lockedElement && !visibleAtomicNumbers.has(lockedElement.atomicNumber)) {
    lockedElement = null;
  }

  for (const element of filtered) {
    const { row, col } = displayPosition(element);
    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = `element ${CATEGORY_CLASS[element.category] || 'nonmetal'}`;
    tile.style.gridRow = String(row);
    tile.style.gridColumn = String(col);
    tile.dataset.atomicNumber = String(element.atomicNumber);
    tile.dataset.symbol = element.symbol;
    tile.dataset.name = element.name;
    tile.dataset.category = element.category;
    tile.setAttribute('aria-label', `${element.name} (${element.symbol}), atomic number ${element.atomicNumber}`);

    tile.innerHTML = `
      <span class="atomic-number">${element.atomicNumber}</span>
      <span class="symbol">${escapeHtml(element.symbol)}</span>
      <span class="name">${escapeHtml(element.name)}</span>
      <span class="mass">${escapeHtml(String(element.atomicMass ?? 'Unknown'))}</span>
    `;

    periodicGrid.appendChild(tile);
  }

  setActiveElementClass();
  countInfo.textContent = `${filtered.length} / ${elements.length} elements shown`;

  if (filtered.length === 0) {
    detailPanel.innerHTML = '<h2>No elements found</h2><p>Try a different search keyword or category.</p>';
    return;
  }

  if (lockedElement) {
    buildDetailPanel(lockedElement);
  } else {
    buildDetailPanel(filtered[0]);
  }
}

function bindGridInteractions() {
  periodicGrid.addEventListener('mouseover', (event) => {
    const tile = event.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;
    handleTileHover(tile);
  });

  periodicGrid.addEventListener('focusin', (event) => {
    const tile = event.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;
    handleTileHover(tile);
  });

  periodicGrid.addEventListener('mouseleave', () => {
    if (!lockedElement) restoreDetailPanel();
  });

  periodicGrid.addEventListener('click', (event) => {
    const tile = event.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;
    handleTileClick(tile);
  });
}

async function initPeriodicTable() {
  if (!periodicGrid || !detailPanel || !searchInput || !categoryFilter || !countInfo) {
    return;
  }

  try {
    const response = await fetch('periodic-data.json', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Unable to load data (${response.status})`);
    }

    const elements = await response.json();
    if (!Array.isArray(elements) || elements.length === 0) {
      throw new Error('Periodic data is empty or invalid.');
    }

    allElements = elements;
    elementsByAtomicNumber = new Map(elements.map((element) => [element.atomicNumber, element]));

    bindGridInteractions();
    renderElements(elements);

    searchInput.addEventListener('input', () => renderElements(elements));
    categoryFilter.addEventListener('change', () => renderElements(elements));
  } catch (error) {
    detailPanel.innerHTML = `<h2>Could not load periodic table</h2><p>${escapeHtml(error.message)}</p>`;
    countInfo.textContent = '0 / 0 elements shown';
  }
}
initPeriodicTable();
;
