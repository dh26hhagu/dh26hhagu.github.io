/**
 * Minimal data access for the future experiment dataset.
 *
 * Data model:
 * - videos: { youtubeId, channel }
 * - experiments: { id, youtubeId, grade, title, categoryId, topicId, keywords, reviewStatus }
 * - pageOrder: page key -> ordered occurrences
 *   { experimentId, occurrenceId?, titleOverride? }
 *
 * Repeated experiment references are allowed in pageOrder so legacy duplicates
 * can be preserved explicitly during migration.
 */

const DATA_URL = new URL("./experiment-data.json", import.meta.url);
const VALID_GRADES = new Set([10, 11, 12]);
const VALID_REVIEW_STATUSES = new Set([
  "verified",
  "unverified",
  "needs-review",
  "mismatch-confirmed"
]);
const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

let cachedData = null;
let pendingLoad = null;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function assert(condition, message) {
  if (!condition) throw new TypeError(message);
}

function validateNullableId(value, field, experimentId) {
  assert(
    value === null || isNonEmptyString(value),
    `Experiment "${experimentId}" has invalid ${field}; expected a non-empty string or null.`
  );
}

/**
 * Validate the new dataset without transforming or dropping records.
 * Duplicate experiment references in pageOrder are intentional and permitted.
 */
export function validateData(data) {
  assert(data && typeof data === "object" && !Array.isArray(data), "Dataset must be an object.");
  assert(data.schemaVersion === 1, "Unsupported experiment dataset schemaVersion.");
  assert(Array.isArray(data.videos), "Dataset videos must be an array.");
  assert(Array.isArray(data.experiments), "Dataset experiments must be an array.");
  assert(data.pageOrder && typeof data.pageOrder === "object" && !Array.isArray(data.pageOrder), "Dataset pageOrder must be an object.");

  const videosById = new Map();
  for (const video of data.videos) {
    assert(video && typeof video === "object" && !Array.isArray(video), "Each video must be an object.");
    assert(isNonEmptyString(video.youtubeId) && YOUTUBE_ID_PATTERN.test(video.youtubeId), "Video youtubeId must be a valid 11-character YouTube ID.");
    assert(isNonEmptyString(video.channel), `Video "${video.youtubeId}" must have a channel.`);
    assert(!videosById.has(video.youtubeId), `Duplicate video youtubeId "${video.youtubeId}".`);
    videosById.set(video.youtubeId, video);
  }

  const experimentsById = new Map();
  for (const experiment of data.experiments) {
    assert(experiment && typeof experiment === "object" && !Array.isArray(experiment), "Each experiment must be an object.");
    assert(isNonEmptyString(experiment.id), "Experiment id is required.");
    assert(!experimentsById.has(experiment.id), `Duplicate experiment id "${experiment.id}".`);
    assert(isNonEmptyString(experiment.youtubeId) && YOUTUBE_ID_PATTERN.test(experiment.youtubeId), `Experiment "${experiment.id}" has an invalid youtubeId.`);
    assert(videosById.has(experiment.youtubeId), `Experiment "${experiment.id}" references an unknown video.`);
    assert(VALID_GRADES.has(experiment.grade), `Experiment "${experiment.id}" grade must be 10, 11, or 12.`);
    assert(isNonEmptyString(experiment.title), `Experiment "${experiment.id}" title is required.`);
    assert(Array.isArray(experiment.keywords) && experiment.keywords.every(isNonEmptyString), `Experiment "${experiment.id}" keywords must be an array of non-empty strings.`);
    validateNullableId(experiment.categoryId, "categoryId", experiment.id);
    validateNullableId(experiment.topicId, "topicId", experiment.id);
    assert(VALID_REVIEW_STATUSES.has(experiment.reviewStatus), `Experiment "${experiment.id}" has an unsupported reviewStatus.`);
    experimentsById.set(experiment.id, experiment);
  }

  for (const [page, occurrences] of Object.entries(data.pageOrder)) {
    assert(isNonEmptyString(page), "Page order keys must be non-empty strings.");
    assert(Array.isArray(occurrences), `Page order "${page}" must be an array.`);
    for (const occurrence of occurrences) {
      assert(occurrence && typeof occurrence === "object" && !Array.isArray(occurrence), `Each occurrence in "${page}" must be an object.`);
      assert(isNonEmptyString(occurrence.experimentId), `Occurrence in "${page}" requires experimentId.`);
      assert(experimentsById.has(occurrence.experimentId), `Occurrence in "${page}" references unknown experiment "${occurrence.experimentId}".`);
      if (occurrence.occurrenceId !== undefined) {
        assert(isNonEmptyString(occurrence.occurrenceId), `Occurrence in "${page}" has an invalid occurrenceId.`);
      }
      if (occurrence.titleOverride !== undefined && occurrence.titleOverride !== null) {
        assert(isNonEmptyString(occurrence.titleOverride), `Occurrence in "${page}" has an invalid titleOverride.`);
      }
    }
  }

  return data;
}

export function buildYouTubeUrl(youtubeId) {
  assert(isNonEmptyString(youtubeId) && YOUTUBE_ID_PATTERN.test(youtubeId), "Cannot build a YouTube URL from an invalid ID.");
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export function buildThumbnailUrl(youtubeId) {
  assert(isNonEmptyString(youtubeId) && YOUTUBE_ID_PATTERN.test(youtubeId), "Cannot build a thumbnail URL from an invalid ID.");
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function getGradeBadge(grade) {
  assert(VALID_GRADES.has(grade), "Grade must be 10, 11, or 12.");
  return `Lớp ${grade}`;
}

/** Load and cache experiment-data.json. Pass { reload: true } to fetch it again. */
export async function load({ reload = false } = {}) {
  if (cachedData && !reload) return cachedData;
  if (pendingLoad && !reload) return pendingLoad;

  pendingLoad = fetch(DATA_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`Unable to load experiment data (${response.status}).`);
      return response.json();
    })
    .then((data) => {
      cachedData = validateData(data);
      return cachedData;
    })
    .catch((error) => {
      pendingLoad = null;
      throw error;
    });

  return pendingLoad;
}

export async function getAll() {
  return (await load()).experiments.slice();
}

export async function getByGrade(grade) {
  assert(VALID_GRADES.has(grade), "Grade must be 10, 11, or 12.");
  return (await load()).experiments.filter((experiment) => experiment.grade === grade);
}

export async function getById(id) {
  if (!isNonEmptyString(id)) return null;
  const data = await load();
  return data.experiments.find((experiment) => experiment.id === id) || null;
}

/**
 * Return occurrences in the saved order, resolving each to its experiment/video.
 * Repeated occurrences and title overrides are returned as-is.
 */
export async function getPageOccurrences(page) {
  if (!isNonEmptyString(page)) return [];
  const data = await load();
  const videosById = new Map(data.videos.map((video) => [video.youtubeId, video]));
  const experimentsById = new Map(data.experiments.map((experiment) => [experiment.id, experiment]));

  return (data.pageOrder[page] || []).map((occurrence) => {
    const experiment = experimentsById.get(occurrence.experimentId);
    const video = videosById.get(experiment.youtubeId);
    return {
      ...occurrence,
      experiment,
      video,
      title: occurrence.titleOverride ?? experiment.title,
      ytLink: buildYouTubeUrl(video.youtubeId),
      thumbnail: buildThumbnailUrl(video.youtubeId),
      badge: getGradeBadge(experiment.grade)
    };
  });
}
