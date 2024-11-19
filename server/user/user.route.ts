import express from "express";
import { userController } from "@/user/user.config";

const router = express.Router();

router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/request-reset-password", userController.requestResetPassword);
router.post("/verify-code", userController.verifyCodeForReset);
router.post("/reset-password");

export default router;