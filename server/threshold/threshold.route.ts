import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { thresholdController } from "@/threshold/threshold.config";

const router = express.Router();

router.post("/create", protectRoute, thresholdController.createThreshold);
router.get("/get", protectRoute, thresholdController.getThreshold);
router.put("/update/:id", protectRoute, thresholdController.updateThreshold);
router.delete("/delete/:id", protectRoute, thresholdController.deleteThreshold);

export default router;