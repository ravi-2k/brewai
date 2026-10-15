import mongoose from "mongoose";

// Must match the tool ids in client/src/config/tools.js.
const TOOLS = [
  "write-article",
  "blog-titles",
  "generate-image",
  "remove-background",
  "remove-object",
  "review-resume",
];

// Must match IMAGE_STYLES in client/src/config/toolOptions.js.
const IMAGE_STYLES = [
  "Realistic",
  "Ghibli Style",
  "Anime Style",
  "Cartoon Style",
  "Fantasy Style",
  "3D Style",
  "Portrait Style",
];

/**
 * One document = one result produced by any AI tool.
 *  - Dashboard: all creations of the logged-in user.
 *  - Community: creations where tool = "generate-image" AND isPublic = true.
 */
const creationSchema = new mongoose.Schema(
  {
    // Clerk user ID of the owner, e.g. "user_2abc...". Always taken from the
    // verified token on the server, never from the request body.
    userId: {
      type: String,
      required: true,
    },

    // Snapshot of the creator's name (shown on Community cards). We have no Users collection.
    authorName: {
      type: String,
      trim: true,
      default: "Anonymous",
    },

    tool: {
      type: String,
      enum: TOOLS,
      required: true,
    },

    // Short label for the Dashboard card, e.g. "Titles for 'Healthy meal prep'".
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [150, "Title can be at most 150 characters"],
    },

    // What the user typed: topic, keyword, image description or object to remove.
    prompt: {
      type: String,
      trim: true,
      maxlength: [1000, "Prompt can be at most 1000 characters"],
    },

    // Text result (article, titles, resume feedback). Empty for image tools.
    content: {
      type: String,
    },

    // Image tools only: Cloudinary delivery URL, and the ID needed to delete the file later.
    imageUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },

    // Generate Image only: the style pill that was selected.
    style: {
      type: String,
      enum: IMAGE_STYLES,
    },

    // Generate Image only: the "Make the image public" toggle.
    isPublic: {
      type: Boolean,
      default: false,
      validate: {
        validator: function (value) {
          return !value || this.tool === "generate-image";
        },
        message: "Only generated images can be made public",
      },
    },

    // Clerk IDs of users who liked it (Community). Update with $addToSet / $pull
    // so a double click can never count twice.
    likedBy: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        // Don't leak user IDs to the browser. Controllers add `likedByMe`
        // (doc.likedBy.includes(currentUserId)) before sending.
        delete ret.likedBy;
        delete ret.userId;
        delete ret.publicId; // Cloudinary's internal ID: only the server needs it
        return ret;
      },
    },
  },
);

// The number the UI shows. Derived, so it can never drift from likedBy.
creationSchema.virtual("likes").get(function () {
  return this.likedBy.length;
});

/**
 * Instance method: the JSON we send to the browser, personalised for one viewer.
 * toJSON() removes `likedBy` (so other users' IDs never leak), so `likedByMe`
 * must be computed from the document first. Always call this, not res.json(doc).
 */
creationSchema.methods.toResponse = function (viewerId) {
  return {
    ...this.toJSON(),
    likedByMe: this.likedBy.includes(viewerId),
  };
};

// Dashboard: "my creations, newest first" (also covers ownership lookups).
creationSchema.index({ userId: 1, createdAt: -1 });

// Community: newest public images. Partial index = only public docs are indexed.
creationSchema.index(
  { createdAt: -1 },
  { partialFilterExpression: { isPublic: true } },
);

const Creation = mongoose.model("Creation", creationSchema);

export default Creation;
