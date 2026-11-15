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

const UI_TRANSLATIONS = {
  vi: {
    pageTitle: 'Bảng tuần hoàn các nguyên tố hóa học',
    subtitle: 'Khám phá vị trí, phân loại và thông tin khoa học của 118 nguyên tố.',
    languageGroup: 'Ngôn ngữ giao diện',
    controlsLabel: 'Tìm và lọc nguyên tố',
    searchLabel: 'Tìm nguyên tố',
    searchPlaceholder: 'Tên tiếng Anh, ký hiệu hoặc số hiệu nguyên tử',
    categoryLabel: 'Lọc theo phân loại',
    categoryOptions: {
      all: 'Tất cả phân loại',
      'alkali metal': 'Kim loại kiềm',
      'alkaline earth metal': 'Kim loại kiềm thổ',
      'transition metal': 'Kim loại chuyển tiếp',
      'post-transition metal': 'Kim loại hậu chuyển tiếp',
      metalloid: 'Á kim',
      nonmetal: 'Phi kim',
      halogen: 'Halogen',
      'noble gas': 'Khí hiếm',
      lanthanide: 'Họ Lantan',
      actinide: 'Họ Actini'
    },
    legendLabel: 'Chú giải phân loại nguyên tố',
    tableRegion: 'Bảng tuần hoàn, có thể cuộn ngang',
    tableLabel: 'Các nguyên tố hóa học',
    tableHeading: 'Bảng tuần hoàn',
    detailsRegion: 'Thông tin nguyên tố đang chọn',
    detailsHeading: 'Thông tin nguyên tố',
    usage: 'Chọn một nguyên tố để xem thông tin. Dùng Tab để di chuyển và Enter hoặc Space để chọn.',
    period: 'Chu kỳ',
    group: 'Nhóm',
    lanthanides: 'Họ Lantan',
    actinides: 'Họ Actini',
    count: (count) => `${count}/118 nguyên tố`,
    languageChanged: 'Đã chuyển ngôn ngữ giao diện sang Tiếng Việt.',
    noMatchTitle: 'Không có kết quả phù hợp',
    noMatchBody: 'Thử từ khóa hoặc bộ lọc khác.',
    loading: 'Đang tải dữ liệu bảng tuần hoàn…',
    loadErrorTitle: 'Không tải được dữ liệu bảng tuần hoàn',
    loadErrorBody: 'Vui lòng kiểm tra kết nối và thử tải lại trang.',
    unknown: 'Chưa có dữ liệu',
    fields: {
      atomicNumber: 'Số hiệu nguyên tử',
      group: 'Nhóm',
      period: 'Chu kỳ',
      block: 'Khối',
      category: 'Phân loại',
      atomicMass: 'Nguyên tử khối',
      electronConfiguration: 'Cấu hình electron',
      electronegativity: 'Độ âm điện',
      meltingPoint: 'Nhiệt độ nóng chảy',
      boilingPoint: 'Nhiệt độ sôi'
    }
  },
  en: {
    pageTitle: 'Periodic Table of the Elements',
    subtitle: 'Explore the positions, classifications, and scientific data for 118 elements.',
    languageGroup: 'Interface language',
    controlsLabel: 'Search and filter elements',
    searchLabel: 'Search elements',
    searchPlaceholder: 'English name, symbol, or atomic number',
    categoryLabel: 'Filter by category',
    categoryOptions: {
      all: 'All categories',
      'alkali metal': 'Alkali metals',
      'alkaline earth metal': 'Alkaline earth metals',
      'transition metal': 'Transition metals',
      'post-transition metal': 'Post-transition metals',
      metalloid: 'Metalloids',
      nonmetal: 'Nonmetals',
      halogen: 'Halogens',
      'noble gas': 'Noble gases',
      lanthanide: 'Lanthanides',
      actinide: 'Actinides'
    },
    legendLabel: 'Element category legend',
    tableRegion: 'Periodic table; scroll horizontally on narrow screens',
    tableLabel: 'Chemical elements',
    tableHeading: 'Periodic table',
    detailsRegion: 'Details for the selected element',
    detailsHeading: 'Element details',
    usage: 'Select an element to view its details. Use Tab to move and Enter or Space to select.',
    period: 'Period',
    group: 'Group',
    lanthanides: 'Lanthanides',
    actinides: 'Actinides',
    count: (count) => `${count}/118 elements`,
    languageChanged: 'Interface language changed to English.',
    noMatchTitle: 'No matching elements',
    noMatchBody: 'Try another search term or filter.',
    loading: 'Loading periodic table data…',
    loadErrorTitle: 'Unable to load periodic table data',
    loadErrorBody: 'Check your connection and try reloading the page.',
    unknown: 'No data available',
    fields: {
      atomicNumber: 'Atomic number',
      group: 'Group',
      period: 'Period',
      block: 'Block',
      category: 'Category',
      atomicMass: 'Atomic mass',
      electronConfiguration: 'Electron configuration',
      electronegativity: 'Electronegativity',
      meltingPoint: 'Melting point',
      boilingPoint: 'Boiling point'
    }
  }
};

// ===== DOM =====
const periodicGrid = document.getElementById('periodic-table');
const detailPanel = document.getElementById('detail-panel');
const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('category-filter');
const countInfo = document.getElementById('count-info');
const languageControls = document.getElementById('language-controls');
const languageStatus = document.getElementById('language-status');

// ===== STATE =====
let elements = [];
let filteredElements = [];
let elementByAtomicNumber = new Map();
let lockedAtomicNumber = null;
let hoveredTile = null;
let searchDebounceId = null;
let dataLoadFailed = false;

function readPreferredLanguage() {
  try {
    return window.localStorage.getItem('periodicTableLanguage') === 'en' ? 'en' : 'vi';
  } catch {
    return 'vi';
  }
}

let currentLanguage = readPreferredLanguage();

function getTranslations() {
  return UI_TRANSLATIONS[currentLanguage];
}

function setTextById(id, text) {
  const node = document.getElementById(id);
  if (node) node.textContent = text;
}

function updateElementTileLanguage() {
  const numberLabel = currentLanguage === 'vi' ? 'số hiệu nguyên tử' : 'atomic number';
  periodicGrid.querySelectorAll('.element').forEach((tile) => {
    const element = getElementData(tile.dataset.atomicNumber);
    if (!element) return;
    const numberDescription = tile.querySelector(`#element-number-description-${element.atomicNumber}`);
    if (numberDescription) {
      numberDescription.textContent = `${numberLabel} ${element.atomicNumber}`;
      numberDescription.lang = currentLanguage;
    }
    tile.setAttribute('aria-pressed', String(lockedAtomicNumber === element.atomicNumber));
  });
}

function updateLanguageText({ announce = false } = {}) {
  const translations = getTranslations();
  document.title = translations.pageTitle;
  document.documentElement.lang = currentLanguage;
  setTextById('page-title', translations.pageTitle);
  setTextById('page-subtitle', translations.subtitle);
  setTextById('usage-hint', translations.usage);
  setTextById('search-label', translations.searchLabel);
  setTextById('category-label', translations.categoryLabel);
  setTextById('legend-alkali-metal', translations.categoryOptions['alkali metal']);
  setTextById('legend-alkaline-earth-metal', translations.categoryOptions['alkaline earth metal']);
  setTextById('legend-transition-metal', translations.categoryOptions['transition metal']);
  setTextById('legend-post-transition-metal', translations.categoryOptions['post-transition metal']);
  setTextById('legend-metalloid', translations.categoryOptions.metalloid);
  setTextById('legend-nonmetal', translations.categoryOptions.nonmetal);
  setTextById('legend-halogen', translations.categoryOptions.halogen);
  setTextById('legend-noble-gas', translations.categoryOptions['noble gas']);
  setTextById('legend-lanthanide', translations.categoryOptions.lanthanide);
  setTextById('legend-actinide', translations.categoryOptions.actinide);
  setTextById('table-section-heading', translations.tableHeading);
  setTextById('period-label-corner', translations.period);
  setTextById('group-label-corner', translations.group);
  setTextById('lanthanide-label', translations.lanthanides);
  setTextById('actinide-label', translations.actinides);
  searchInput.placeholder = translations.searchPlaceholder;
  languageControls.setAttribute('aria-label', translations.languageGroup);
  document.getElementById('periodic-controls').setAttribute('aria-label', translations.controlsLabel);
  document.getElementById('category-legend').setAttribute('aria-label', translations.legendLabel);
  document.getElementById('table-wrap').setAttribute('aria-label', translations.tableRegion);
  periodicGrid.setAttribute('aria-label', translations.tableLabel);
  detailPanel.setAttribute('aria-label', translations.detailsRegion);

  for (const option of categoryFilter.options) {
    option.textContent = translations.categoryOptions[option.value];
  }

  languageControls.querySelectorAll('[data-language]').forEach((button) => {
    const buttonLanguage = button.dataset.language;
    button.setAttribute('aria-pressed', String(buttonLanguage === currentLanguage));
    button.setAttribute('aria-label', buttonLanguage === 'vi' ? 'Tiếng Việt' : 'English');
  });

  if (elements.length) {
    countInfo.textContent = translations.count(filteredElements.length);
    updateElementTileLanguage();
    updateDetailPanel(getDetailTarget());
  } else if (dataLoadFailed) {
    countInfo.textContent = translations.loadErrorTitle;
    detailPanel.innerHTML = `<h2 id="element-details-heading">${escapeHtml(translations.loadErrorTitle)}</h2><p>${escapeHtml(translations.loadErrorBody)}</p>`;
  } else {
    countInfo.textContent = translations.loading;
    detailPanel.innerHTML = `<h2 id="element-details-heading">${escapeHtml(translations.detailsHeading)}</h2><p>${escapeHtml(translations.loading)}</p>`;
  }

  if (announce) languageStatus.textContent = translations.languageChanged;
}

function setLanguage(language) {
  if (!Object.prototype.hasOwnProperty.call(UI_TRANSLATIONS, language) || language === currentLanguage) return;

  const selectedCategory = categoryFilter.value;
  currentLanguage = language;
  updateLanguageText({ announce: true });
  categoryFilter.value = selectedCategory;

  try {
    window.localStorage.setItem('periodicTableLanguage', currentLanguage);
  } catch {
    // Language switching remains available when browser storage is blocked.
  }
}

// ===== UTILS =====
const escapeHtml = (str) =>
  String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

function formatValue(value, suffix = '') {
  if (value === null || value === undefined || value === '') return getTranslations().unknown;
  return `${value}${suffix}`;
}

function electronConfigToHtml(config = '') {
  return String(config)
    .split('')
    .map((char) => (SUPERSCRIPT_MAP[char] ? `<sup>${SUPERSCRIPT_MAP[char]}</sup>` : escapeHtml(char)))
    .join('') || escapeHtml(getTranslations().unknown);
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
  const translations = getTranslations();
  const corner = document.createElement('div');
  corner.className = 'corner-cell';
  const periodLabel = document.createElement('span');
  periodLabel.id = 'period-label-corner';
  periodLabel.textContent = translations.period;
  const groupLabel = document.createElement('span');
  groupLabel.id = 'group-label-corner';
  groupLabel.textContent = translations.group;
  corner.append(periodLabel, groupLabel);
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
  lanthanideLabel.id = 'lanthanide-label';
  lanthanideLabel.style.gridRow = '9';
  lanthanideLabel.style.gridColumn = '1';
  lanthanideLabel.textContent = translations.lanthanides;
  fragment.appendChild(lanthanideLabel);

  const actinideLabel = document.createElement('div');
  actinideLabel.className = 'f-block-label';
  actinideLabel.id = 'actinide-label';
  actinideLabel.style.gridRow = '10';
  actinideLabel.style.gridColumn = '1';
  actinideLabel.textContent = translations.actinides;
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
  tile.setAttribute('aria-labelledby', `element-name-${element.atomicNumber} element-symbol-${element.atomicNumber} element-number-description-${element.atomicNumber}`);
  tile.setAttribute('aria-pressed', String(lockedAtomicNumber === element.atomicNumber));

  tile.innerHTML = `
    <span class="atomic-number">${element.atomicNumber}</span>
    <strong class="symbol" id="element-symbol-${element.atomicNumber}">${escapeHtml(element.symbol)}</strong>
    <small class="element-name" id="element-name-${element.atomicNumber}" lang="en" title="${escapeHtml(element.name)}">${escapeHtml(element.name)}</small>
    <small class="mass" title="${escapeHtml(String(element.atomicMass))}">${escapeHtml(String(element.atomicMass))}</small>
    <span class="visually-hidden element-number-description" id="element-number-description-${element.atomicNumber}" lang="${currentLanguage}">${currentLanguage === 'vi' ? 'số hiệu nguyên tử' : 'atomic number'} ${element.atomicNumber}</span>
  `;

  return tile;
}

// ===== DETAIL PANEL =====
function updateDetailPanel(element, animate = false) {
  const translations = getTranslations();
  if (!element) {
    detailPanel.innerHTML = `<h2 id="element-details-heading">${escapeHtml(translations.noMatchTitle)}</h2><p>${escapeHtml(translations.noMatchBody)}</p>`;
    return;
  }

  const groupText = element.group ? `${element.group} (${OLD_GROUP_LABELS[element.group]})` : translations.unknown;
  const categoryText = translations.categoryOptions[element.category] || element.category;

  detailPanel.innerHTML = `
    <h2 id="element-details-heading"><span lang="en">${escapeHtml(element.name)}</span> (${escapeHtml(element.symbol)})</h2>
    <dl class="detail-grid">
      <dt>${escapeHtml(translations.fields.atomicNumber)}</dt><dd>${element.atomicNumber}</dd>
      <dt>${escapeHtml(translations.fields.group)}</dt><dd>${escapeHtml(groupText)}</dd>
      <dt>${escapeHtml(translations.fields.period)}</dt><dd>${element.period}</dd>
      <dt>${escapeHtml(translations.fields.block)}</dt><dd>${escapeHtml(element.block.toUpperCase())}</dd>
      <dt>${escapeHtml(translations.fields.category)}</dt><dd>${escapeHtml(categoryText)}</dd>
      <dt>${escapeHtml(translations.fields.atomicMass)}</dt><dd>${escapeHtml(formatValue(element.atomicMass))}</dd>
      <dt>${escapeHtml(translations.fields.electronConfiguration)}</dt><dd>${electronConfigToHtml(element.electronConfiguration)}</dd>
      <dt>${escapeHtml(translations.fields.electronegativity)}</dt><dd>${escapeHtml(formatValue(element.electronegativity))}</dd>
      <dt>${escapeHtml(translations.fields.meltingPoint)}</dt><dd>${escapeHtml(formatValue(element.meltingPoint, ' °C'))}</dd>
      <dt>${escapeHtml(translations.fields.boilingPoint)}</dt><dd>${escapeHtml(formatValue(element.boilingPoint, ' °C'))}</dd>
    </dl>
  `;

  if (animate) {
    detailPanel.classList.remove('panel-transition');
    void detailPanel.offsetWidth;
    detailPanel.classList.add('panel-transition');
  }
}

function updateActiveTile() {
  periodicGrid.querySelectorAll('.element').forEach((node) => {
    node.classList.remove('active');
    node.setAttribute('aria-pressed', 'false');
  });

  if (!lockedAtomicNumber) return;

  const tile = periodicGrid.querySelector(`[data-atomic-number="${lockedAtomicNumber}"]`);
  if (tile) {
    tile.classList.add('active');
    tile.setAttribute('aria-pressed', 'true');
  }
}

function setHoveredTile(tile) {
  if (hoveredTile === tile) return;

  if (hoveredTile) hoveredTile.classList.remove('hovered');
  hoveredTile = tile || null;
  if (hoveredTile) hoveredTile.classList.add('hovered');
}

// ===== RENDER =====
function renderTable() {
  periodicGrid.setAttribute('aria-busy', 'true');

  filteredElements = getFilteredElements();

  const fragment = document.createDocumentFragment();
  buildGridSkeleton(fragment);
  filteredElements.forEach((element) => {
    const tile = buildElementTile(element);
    if (tile) fragment.appendChild(tile);
  });

  periodicGrid.replaceChildren(fragment);
  periodicGrid.setAttribute('aria-busy', 'false');
  countInfo.textContent = getTranslations().count(filteredElements.length);

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

  setHoveredTile(tile);
  updateDetailPanel(data, true);
}

function handleClick(tile, data) {
  if (!data) return;

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
  languageControls.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language]');
    if (!button || !languageControls.contains(button)) return;
    setLanguage(button.dataset.language);
  });

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
  updateLanguageText();
  bindEvents();
  try {
    const response = await fetch('periodic-data.json');
    if (!response.ok) throw new Error(`Unable to load periodic data (${response.status}).`);
    const data = await response.json();

    elements = validateAndNormalizeData(data);
    elementByAtomicNumber = new Map(elements.map((element) => [element.atomicNumber, element]));
    renderTable();
  } catch (error) {
    dataLoadFailed = true;
    periodicGrid.setAttribute('aria-busy', 'false');
    countInfo.textContent = getTranslations().loadErrorTitle;
    detailPanel.innerHTML = `<h2 id="element-details-heading">${escapeHtml(getTranslations().loadErrorTitle)}</h2><p>${escapeHtml(getTranslations().loadErrorBody)}</p>`;
    console.error(error);
  }
}

init();
