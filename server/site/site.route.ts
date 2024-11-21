import express from "express";
import { protectRoute } from "@/site/site.config";
import { siteController } from "@/site/site.config";

const router = express.Router();

router.post("/create", protectRoute, siteController.createSite);
router.get("/user/:userId", protectRoute, siteController.getSiteByUser);
router.put("/update/:id",protectRoute, siteController.updateSite);
router.delete("/delete/:id",protectRoute, siteController.deleteSite);

export default router;