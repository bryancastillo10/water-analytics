import express from "express";
import { authController } from "@/auth/auth.config";

const router = express.Router();

router.post("/signin",authController.signIn)
router.post("/signup", authController.signUp)
router.post("/signout",authController.signOut)

export default router;