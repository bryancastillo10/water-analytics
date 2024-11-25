import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { upload } from "@/infrastructure/middleware/upload.middleware";
import { siteController } from "@/site/site.config";

const router = express.Router();

router.post("/create", protectRoute,upload.single("image"),siteController.createSite);
router.get("/user/:userId", protectRoute, siteController.getSiteByUser);
router.put("/update/:id",protectRoute, siteController.updateSite);
router.delete("/delete/:id",protectRoute, siteController.deleteSite);

export default router;