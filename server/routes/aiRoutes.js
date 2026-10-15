import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { uploadImageFile, uploadResumeFile } from "../middlewares/uploadFile.js";
import {
  writeArticle,
  generateBlogTitles,
  generateImageCreation,
  removeBackground,
  removeObject,
  reviewResume,
} from "../controllers/aiController.js";

const router = Router();

router.use(protect);

router.post("/write-article", writeArticle); // POST /api/ai/write-article
router.post("/blog-titles", generateBlogTitles); // POST /api/ai/blog-titles
router.post("/generate-image", generateImageCreation); // POST /api/ai/generate-image
// Order matters: protect (router.use above) runs first, so anonymous users
// never get to upload anything, then multer parses the file, then the controller.
router.post("/remove-background", uploadImageFile, removeBackground); // POST /api/ai/remove-background
router.post("/remove-object", uploadImageFile, removeObject); // POST /api/ai/remove-object
router.post("/review-resume", uploadResumeFile, reviewResume); // POST /api/ai/review-resume

export default router;
