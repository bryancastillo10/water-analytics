import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { dashboardController } from "@/dashboard/dashboard.config";

const router = express.Router();

router.get("/line/site/:siteId", protectRoute, dashboardController.timeSeries);
router.get("/bar/site/:siteId", protectRoute, dashboardController.nutrientPercentages);
router.get("/pie", protectRoute, dashboardController.sitePercentage);

export default router;