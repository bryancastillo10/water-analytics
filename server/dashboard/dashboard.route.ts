import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { dashboardController } from "@/dashboard/dashboard.config";

const router = express.Router();

router.get("/line/site/:siteId", protectRoute, dashboardController.timeSeries);

export default router;