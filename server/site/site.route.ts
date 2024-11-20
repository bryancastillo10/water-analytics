import express from "express";
// import { siteController, protectRoute } from "@/site/site.config";

const router = express.Router();

router.post("/create");
router.get("/getByUserId");
router.put("/update/:id");
router.delete("/delete/:id");

export default router;