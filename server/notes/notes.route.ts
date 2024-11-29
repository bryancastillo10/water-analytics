import express from "express";
import { protectRoute } from "@/auth/auth.config";
import { notesController } from "@/notes/notes.config";

const router = express.Router();

router.post("/create", protectRoute, notesController.createNotes);
router.get("/user/:userId", protectRoute, notesController.getNotesByUser);
router.put("/update/:id", protectRoute, notesController.updateNotes);
router.delete("/delete/:id", protectRoute, notesController.deleteNotes);

export default router;
