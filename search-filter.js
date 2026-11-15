const CHEMICAL_CHARACTER_MAP = {
  "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
  "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
  "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
  "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
  "⁺": "+", "⁻": "-"
};

/** Normalize user queries and repository fields without changing source data. */
export function normalizeSearchText(value) {
  return String(value ?? "")
    .replace(/[₀-₉⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]/gu, (character) => CHEMICAL_CHARACTER_MAP[character])
    .replace(/[đĐ]/g, "d")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/gu, " ");
}

function normalizeRepositoryField(value) {
  const searchableValue = String(value ?? "")
    .replace(/<sub\b[^>]*>([\s\S]*?)<\/sub>/gi, "$1")
    .replace(/<sup\b[^>]*>([\s\S]*?)<\/sup>/gi, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
  return normalizeSearchText(searchableValue);
}

/** Pair every repository occurrence with exactly one card, including duplicates. */
export function createSearchIndex(occurrences, cards) {
  if (!Array.isArray(occurrences) || !Array.isArray(cards)) {
    throw new TypeError("Occurrences and cards must be arrays.");
  }
  if (occurrences.length !== cards.length) {
    throw new RangeError("Every repository occurrence must have exactly one card.");
  }

  return occurrences.map((item, index) => {
    const keywords = Array.isArray(item?.experiment?.keywords)
      ? item.experiment.keywords.map(normalizeRepositoryField)
      : [];
    const fields = [
      normalizeRepositoryField(item?.title),
      normalizeRepositoryField(item?.video?.channel),
      ...keywords
    ];

    return {
      card: cards[index],
      grade: item?.experiment?.grade,
      searchableText: fields.join(" ")
    };
  });
}

/** Filter an existing index in place, preserving card order and duplicates. */
export function filterSearchIndex(index, { query = "", grade = "all" } = {}) {
  const normalizedQuery = normalizeSearchText(query);
  const selectedGrade = grade === "all" || grade === "" ? null : String(grade);
  let visibleCount = 0;

  for (const entry of index) {
    const matchesQuery = entry.searchableText.includes(normalizedQuery);
    const matchesGrade = selectedGrade === null || String(entry.grade) === selectedGrade;
    entry.card.hidden = !(matchesQuery && matchesGrade);
    if (!entry.card.hidden) visibleCount += 1;
  }

  return visibleCount;
}
