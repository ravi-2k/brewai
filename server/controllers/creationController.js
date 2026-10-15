import Creation from "../models/Creation.js";

// How many items the "Recent Creations" list shows.
const RECENT_LIMIT = 20;

/**
 * GET /api/creations
 * Everything the Dashboard needs: the user's total count + their newest creations.
 */
export const getMyCreations = async (req, res) => {
  // Always filter by the userId from the verified token (set by `protect`),
  // so a user can only ever see their own data.
  const filter = { userId: req.userId };

  // The two queries don't depend on each other, so run them at the same time.
  const [total, creations] = await Promise.all([
    Creation.countDocuments(filter),
    Creation.find(filter).sort({ createdAt: -1 }).limit(RECENT_LIMIT),
  ]);

  // res.json() calls toJSON() on each document, which applies our schema
  // transform (_id -> id, hide userId/likedBy). That's why there is no .lean() here.
  res.json({ success: true, total, creations });
};
