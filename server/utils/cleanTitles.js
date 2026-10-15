/**
 * Turns whatever the AI returned into a safe list of titles.
 * Pure function (no database, no network), so it's easy to test on its own.
 *
 *  - not an array            -> []
 *  - non-strings             -> dropped
 *  - whitespace / newlines   -> collapsed, then trimmed
 *  - empty or duplicate      -> dropped (duplicates compared case-insensitively)
 *  - more than `max`         -> cut to the first `max`
 */
export const cleanTitles = (raw, max = 8) => {
  if (!Array.isArray(raw)) return [];

  const seen = new Set();
  const titles = [];

  for (const item of raw) {
    if (typeof item !== "string") continue;

    const title = item.replace(/\s+/g, " ").trim();
    const key = title.toLowerCase();
    if (!title || seen.has(key)) continue;

    seen.add(key);
    titles.push(title);
    if (titles.length === max) break;
  }

  return titles;
};
