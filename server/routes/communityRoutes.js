import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { getCommunityImages, toggleLike } from "../controllers/communityController.js";

const router = Router();

router.use(protect);

router.get("/", getCommunityImages); // GET /api/community
router.post("/:id/like", toggleLike); // POST /api/community/:id/like

export default router;
