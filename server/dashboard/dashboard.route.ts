import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { dashboardController } from "@/dashboard/dashboard.config";

const router = express.Router();

// Dashboard Filters
router.get("/filter/parameter",protectRoute, dashboardController.getParameterFilters);
router.get("/filter/date/:siteId", protectRoute, dashboardController.getDateFilters);

// Line Chart
router.get("/line/site/:siteId", protectRoute, dashboardController.timeSeries);

// Bar and Gauge Chart
router.get("/bar&gauge/site/:siteId", protectRoute, dashboardController.getParamStats);

// Pie Chart
router.get("/pie", protectRoute, dashboardController.sitePercentage);

// Radar Chart 
router.get("/radar/site/:siteId", protectRoute, dashboardController.getStatDataPerSite);

// Dashboard KPI Card
router.get("/card/site/:siteId", protectRoute, dashboardController.dashboardCard);

export default router;