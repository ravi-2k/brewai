import mongoose from "mongoose";
import Creation from "../models/Creation.js";

const FEED_LIMIT = 50;

/**
 * GET /api/community
 * Public generated images from all users, newest first.
 */
export const getCommunityImages = async (req, res) => {
  const images = await Creation.find({
    isPublic: true,
    tool: "generate-image",
  })
    .sort({ createdAt: -1 })
    .limit(FEED_LIMIT);

  // Personalise each image for the viewer: adds `likedByMe`.
  res.json({
    success: true,
    images: images.map((image) => image.toResponse(req.userId)),
  });
};

/**
 * POST /api/community/:id/like
 * Toggles the current user's like on a public image: like if not liked yet,
 * unlike if already liked. Returns the updated image.
 */
export const toggleLike = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid image id" });
  }

  const filter = { _id: id, isPublic: true, tool: "generate-image" };
  const image = await Creation.findOne(filter);

  if (!image) {
    return res.status(404).json({ success: false, message: "Image not found" });
  }

  const alreadyLiked = image.likedBy.includes(req.userId);

  const update = alreadyLiked
    ? { $pull: { likedBy: req.userId } }
    : { $addToSet: { likedBy: req.userId } };

  const updated = await Creation.findOneAndUpdate(filter, update, {
    returnDocument: "after",
  });

  if (!updated) {
    return res.status(404).json({ success: false, message: "Image not found" });
  }

  res.json({ success: true, image: updated.toResponse(req.userId) });
};
