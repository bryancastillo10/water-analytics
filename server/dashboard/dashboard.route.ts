import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { dashboardController } from "@/dashboard/dashboard.config";

const router = express.Router();

router.get("/filter/parameter",protectRoute, dashboardController.getParameterFilters);
router.get("/filter/date");
router.get("/line/site/:siteId", protectRoute, dashboardController.timeSeries);
router.get("/bar/site/:siteId", protectRoute, dashboardController.nutrientPercentages);
router.get("/pie", protectRoute, dashboardController.sitePercentage);
router.get("/radar/site/:siteId", protectRoute, dashboardController.getDataPerSite);
router.get("/card/site/:siteId", protectRoute, dashboardController.getParameterStatus);

export default router;