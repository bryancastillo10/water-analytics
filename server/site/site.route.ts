import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { upload } from "@/infrastructure/middleware/upload.middleware";
import { siteController } from "@/site/site.config";

const router = express.Router();

router.post("/create", protectRoute,upload.single("sitePhoto"),siteController.createSite);
router.get("/getByUser", protectRoute, siteController.getSiteByUser);
router.put("/update/:id",protectRoute,upload.single("sitePhoto"), siteController.updateSite);
router.delete("/delete/:id",protectRoute, siteController.deleteSite);

export default router;