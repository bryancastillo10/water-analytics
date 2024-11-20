import express from "express";
// import { measurementController } from "@/measurement/measurement.config";

const router = express.Router();

router.post("/add");
router.get("/retrieve-measurement");
router.put("/update/:id");
router.delete("/delete/:id");

export default router;