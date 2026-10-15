const MAX_ITEMS = 6;

const cleanText = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

const cleanList = (value) =>
  Array.isArray(value)
    ? value.map(cleanText).filter(Boolean).slice(0, MAX_ITEMS)
    : [];

/**
 * Validates and tidies what the AI returned. Pure function (no network or
 * database), so it's easy to test. Never trust model output blindly.
 *
 *  - not an object                    -> null (unusable)
 *  - isResume is not exactly true     -> { isResume: false }
 *  - missing score / summary / tips   -> null (unusable)
 *  - otherwise                        -> clean { isResume: true, score, summary, strengths, improvements }
 *    with the score rounded and clamped to 0-100, and lists trimmed and capped.
 */
export const normalizeResumeReview = (raw) => {
  if (!raw || typeof raw !== "object") return null;
  if (raw.isResume !== true) return { isResume: false };

  const score = Number(raw.score);
  const summary = cleanText(raw.summary);
  const strengths = cleanList(raw.strengths);
  const improvements = cleanList(raw.improvements);

  if (!Number.isFinite(score) || !summary || improvements.length === 0) return null;

  return {
    isResume: true,
    score: Math.min(100, Math.max(0, Math.round(score))),
    summary,
    strengths,
    improvements,
  };
};

/**
 * Human-readable version, saved as the Creation's `content` so the Dashboard
 * history can show it as plain text (the structured data is returned separately).
 */
export const formatResumeReview = ({ score, summary, strengths, improvements }) =>
  [
    `Score: ${score}/100`,
    summary,
    `Strengths:\n${strengths.map((item) => `- ${item}`).join("\n")}`,
    `Improvements:\n${improvements.map((item) => `- ${item}`).join("\n")}`,
  ].join("\n\n");
