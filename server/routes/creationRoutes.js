import { Router } from "express";
import { protect } from "../middlewares/protect.js";
import { getMyCreations } from "../controllers/creationController.js";

const router = Router();

// Every route in this file needs a signed-in user.
router.use(protect);

router.get("/", getMyCreations); // GET /api/creations

export default router;
