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
const SUPERSCRIPT_MAP = {
  '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9'
};

// ===== DOM =====
const periodicGrid = document.getElementById('periodic-table');
const detailPanel = document.getElementById('detail-panel');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const countInfo = document.getElementById('count-info');

// ===== STATE =====
let elements = [];
let lockedElement = null;
let hoveredTile = null;

// ===== UTILS =====
const escapeHtml = (str) =>
  String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

function format(value, suffix = '') {
  if (value === null || value === undefined || value === '') return 'Unknown';
  return `${value}${suffix}`;
}

function capitalizeWords(str) {
  return (str || '').replace(/\b\w/g, c => c.toUpperCase());
}

function electronConfigToHtml(config = '') {
  let result = '';
  for (const c of config) {
    if (SUPERSCRIPT_MAP[c]) {
      result += `<sup>${SUPERSCRIPT_MAP[c]}</sup>`;
    } else {
      result += escapeHtml(c);
    }
  }
  return result || 'Unknown';
}

function fitTextToBox(el) {
  let size = 14;
  el.style.fontSize = `${size}px`;

  while (el.scrollWidth > el.clientWidth && size > 6) {
    size--;
    el.style.fontSize = `${size}px`;
  }
}

function normalizeCategory(value) {
  return String(value ?? '').trim().toLowerCase();
}
function getElementData(atomicNumber) {
  return elements.find((e) => e.atomicNumber == atomicNumber);
}

// ===== DATA VALIDATION =====
function validateAndNormalizeData(rawData) {
  if (!Array.isArray(rawData)) {
    throw new Error('Invalid periodic-data.json format: expected an array.');
  }

  const numbers = new Set();
  const normalized = rawData.map((item) => {
    const entry = {
      ...item,
      category: normalizeCategory(item.category),
      meltingPoint: item.meltingPoint ?? null,
      boilingPoint: item.boilingPoint ?? null
    };

    if (!Number.isInteger(entry.atomicNumber) || entry.atomicNumber < 1 || entry.atomicNumber > 118) {
      throw new Error(`Invalid atomicNumber: ${entry.atomicNumber}`);
    }
    if (numbers.has(entry.atomicNumber)) {
      throw new Error(`Duplicate atomicNumber detected: ${entry.atomicNumber}`);
    }
    numbers.add(entry.atomicNumber);

    if (!/^[A-Z][a-z]?$/.test(String(entry.symbol))) {
      throw new Error(`Invalid symbol for atomic number ${entry.atomicNumber}: ${entry.symbol}`);
    }
    if (!/^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(String(entry.name))) {
      throw new Error(`Invalid name for atomic number ${entry.atomicNumber}: ${entry.name}`);
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
    if (!['s', 'p', 'd', 'f'].includes(entry.block)) {
      throw new Error(`Invalid block for atomic number ${entry.atomicNumber}: ${entry.block}`);
    }
    if (!VALID_CATEGORIES.has(entry.category)) {
      throw new Error(`Invalid category for atomic number ${entry.atomicNumber}: ${entry.category}`);
    }

    return entry;
  });

  for (let i = 1; i <= 118; i += 1) {
    if (!numbers.has(i)) throw new Error(`Missing atomicNumber ${i}`);
  }

  return normalized.sort((a, b) => a.atomicNumber - b.atomicNumber);
}

// ===== GRID POSITION =====
function getPosition(el) {
  if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
    return { row: 9, col: el.atomicNumber - 54 };
  }
  if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
    return { row: 10, col: el.atomicNumber - 86 };
  }

  if (el.group === null) return null;

  return { row: el.period + 1, col: el.group + 1 };
}

// ===== BUILD GRID =====
function buildGridSkeleton(fragment) {
  const corner = document.createElement('div');
  corner.className = 'corner-cell';
  corner.innerHTML = '<span>Period</span><span>Group</span>';
  corner.style.gridRow = '1';
  corner.style.gridColumn = '1';
  fragment.appendChild(corner);

  for (let g = 1; g <= 18; g += 1) {
    const cell = document.createElement('div');
    cell.className = 'group-label';
    cell.style.gridRow = '1';
    cell.style.gridColumn = String(g + 1);
    cell.innerHTML = `<div>${g}</div><small>${OLD_GROUP_LABELS[g]}</small>`;
    fragment.appendChild(cell);
  }

  for (let p = 1; p <= 7; p += 1) {
    const cell = document.createElement('div');
    cell.className = 'period-label';
    cell.style.gridRow = String(p + 1);
    cell.style.gridColumn = '1';
    cell.textContent = String(p);
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

// ===== DETAIL PANEL =====
function updateDetail(el, animate = false) {
  if (!el) {
    detailPanel.innerHTML = '<h2>No match</h2><p>Try another search/filter.</p>';
    return;
  }

  const groupText = el.group ? `${el.group} (${OLD_GROUP_LABELS[el.group]})` : 'N/A';

  detailPanel.innerHTML = `
    <h2>${escapeHtml(el.name)} (${escapeHtml(el.symbol)})</h2>
    <div class="detail-grid">
      <div class="label">Atomic Number</div><div>${el.atomicNumber}</div>
      <div class="label">Group</div><div>${groupText}</div>
      <div class="label">Period</div><div>${el.period}</div>
      <div class="label">Block</div><div>${escapeHtml(el.block.toUpperCase())}</div>
      <div class="label">Category</div><div>${escapeHtml(capitalizeWords(el.category))}</div>
      <div class="label">Atomic Mass</div><div>${escapeHtml(String(el.atomicMass))}</div>
      <div class="label">Electron</div><div>${electronConfigToHtml(el.electronConfiguration)}</div>
      <div class="label">Electronegativity</div><div>${format(el.electronegativity)}</div>
      <div class="label">Melting</div><div>${format(el.meltingPoint, ' °C')}</div>
      <div class="label">Boiling</div><div>${format(el.boilingPoint, ' °C')}</div>
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

  if (!lockedElement) return;

const tile = periodicGrid.querySelector(`[data-atomic-number="${lockedElement.atomicNumber}"]`);
  if (tile) tile.classList.add('active');
}

function setHoveredTile(tile) {
  if (hoveredTile === tile) return;

  if (hoveredTile) hoveredTile.classList.remove('hovered');
  hoveredTile = tile || null;
  if (hoveredTile) hoveredTile.classList.add('hovered');
}

function render() {
  const q = searchInput.value.trim().toLowerCase();
  const c = categoryFilter.value;

  const filtered = elements.filter((el) => {
    const searchable = `${el.atomicNumber} ${el.name.toLowerCase()} ${el.symbol.toLowerCase()}`;
    const matchesText = !q || searchable.includes(q);
    const matchesCategory = c === 'all' || el.category === c;
    return matchesText && matchesCategory;
  });

  const fragment = document.createDocumentFragment();
  buildGridSkeleton(fragment);

  filtered.forEach((el) => {
    const pos = getPosition(el);
    if (!pos) return;

    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = `element ${CATEGORY_CLASS[el.category] || ''}`;
    tile.style.gridRow = String(pos.row);
    tile.style.gridColumn = String(pos.col);
    tile.dataset.atomicNumber = String(el.atomicNumber);

    tile.innerHTML = `
      <span class="atomic-number">${el.atomicNumber}</span>
      <strong class="symbol">${escapeHtml(el.symbol)}</strong>
      <small class="element-name">${escapeHtml(el.name)}</small>
      <small class="mass">${escapeHtml(String(el.atomicMass))}</small>
    `;

    fragment.appendChild(tile);
  });

  periodicGrid.replaceChildren(fragment);
  countInfo.textContent = `${filtered.length}/118`;

  periodicGrid.querySelectorAll('.element-name, .mass').forEach((node) => fitTextToBox(node));

  if (lockedElement && !filtered.some((e) => e.atomicNumber === lockedElement.atomicNumber)) {
    lockedElement = null;
  }

  if (!lockedElement && filtered.length) {
    updateDetail(filtered[0]);
  } else {
    updateDetail(lockedElement);
  }

  setHoveredTile(null);
  updateActiveTile();
}

// ===== EVENTS =====
function handleHover(tile, data) {
  if (!data) return;
  if (lockedElement) return;

  console.log('hover:', data.name);
  setHoveredTile(tile);
  updateDetail(data, true);
}

function handleClick(tile, data) {
  if (!data) return;

  if (lockedElement && lockedElement.atomicNumber === data.atomicNumber) {
    lockedElement = null;
    setHoveredTile(null);
    tile.classList.remove('active');
    const firstVisible = periodicGrid.querySelector('.element');
    const firstData = firstVisible ? getElementData(firstVisible.dataset.atomicNumber) : null;
    updateDetail(firstData || null, true);
    console.log('lockedElement:', lockedElement);
    updateActiveTile();
    return;
  }

  lockedElement = data;
  console.log('click lock:', data.name);
  console.log('lockedElement:', lockedElement);
  setHoveredTile(tile);
  updateDetail(data, true);
  updateActiveTile();
}
function bindEvents() {
  periodicGrid.addEventListener('mouseover', (e) => {
    const tile = e.target.closest('.element');
     if (!tile || !periodicGrid.contains(tile)) return;
    const data = getElementData(tile.dataset.atomicNumber);
    handleHover(tile, data);
  });

  periodicGrid.addEventListener('mouseout', (e) => {
    const tile = e.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;

    const related = e.relatedTarget?.closest?.('.element');
    if (related === tile) return;

    setHoveredTile(null);
    if (!lockedElement) {
      const first = elements.find((entry) => {
        const q = searchInput.value.trim().toLowerCase();
        const c = categoryFilter.value;
        const searchable = `${entry.atomicNumber} ${entry.name.toLowerCase()} ${entry.symbol.toLowerCase()}`;
        return (!q || searchable.includes(q)) && (c === 'all' || entry.category === c);
      });
      updateDetail(first || null);
    }
  });

  periodicGrid.addEventListener('click', (e) => {
    const tile = e.target.closest('.element');
    if (!tile || !periodicGrid.contains(tile)) return;

     const data = getElementData(tile.dataset.atomicNumber);
    handleClick(tile, data);
  });

  let debounce;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(render, 120);
  });

  categoryFilter.addEventListener('change', render);
}

// ===== INIT =====
async function init() {
  try {
    const res = await fetch('periodic-data.json');
    const data = await res.json();

    elements = validateAndNormalizeData(data);
    bindEvents();
    render();
  } catch (err) {
    detailPanel.innerHTML = '<h2>Failed to load data</h2><p>Check periodic-data.json structure.</p>';
    console.error(err);
  }
}

init();
