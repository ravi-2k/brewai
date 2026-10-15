import multer from "multer";

/**
 * Builds an Express middleware that accepts ONE uploaded file in a given form
 * field and puts it on `req.file`. A factory (a function that returns a
 * function) lets every route reuse the same logic with different rules.
 *
 *  - memoryStorage: keeps the file in RAM as `req.file.buffer`. Fine for small
 *    files we immediately forward elsewhere; nothing is written to disk.
 *  - limits: stops oversized uploads while they stream in.
 *  - fileFilter: rejects other file types before the file is stored.
 *
 * The browser's reported type can be faked, so the filter is a first check
 * only. The service we forward the file to (Cloudinary, Gemini) validates too.
 *
 * Upload problems become clean 400 JSON responses instead of the generic 500.
 */
const createUploader = ({ field, allowedTypes, maxSizeMB, typeMessage }) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxSizeMB * 1024 * 1024, files: 1 },
    fileFilter: (req, file, callback) => {
      if (allowedTypes.includes(file.mimetype)) return callback(null, true);

      const error = new Error(typeMessage);
      error.isUploadError = true;
      callback(error);
    },
  });

  return (req, res, next) => {
    upload.single(field)(req, res, (error) => {
      if (!error) return next();

      if (error instanceof multer.MulterError) {
        const message =
          error.code === "LIMIT_FILE_SIZE"
            ? `File must be ${maxSizeMB} MB or smaller`
            : `Invalid upload. Send one file in the field named '${field}'`;
        return res.status(400).json({ success: false, message });
      }

      if (error.isUploadError) {
        return res.status(400).json({ success: false, message: error.message });
      }

      next(error); // anything unexpected goes to the global error handler
    });
  };
};

// Images for Remove Background / Remove Object. 10 MB is also Cloudinary's free-plan limit.
export const uploadImageFile = createUploader({
  field: "image",
  allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  maxSizeMB: 10,
  typeMessage: "Only JPG, PNG and WebP images are supported",
});

// Resumes for Review Resume. Smaller limit: they are sent to Gemini inside the request.
export const uploadResumeFile = createUploader({
  field: "resume",
  allowedTypes: ["application/pdf", "image/jpeg", "image/png"],
  maxSizeMB: 5,
  typeMessage: "Only PDF, JPG and PNG files are supported",
});
