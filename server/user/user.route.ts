import express from "express";
import { userController } from "@/user/user.config";
import { protectRoute } from "@/auth/auth.config";

const router = express.Router();

router.put("/update/:id", protectRoute,userController.updateUser);
router.delete("/delete/:id",protectRoute, userController.deleteUser);
router.post("/request-reset-password", userController.requestResetPassword);
router.post("/verify-code", userController.verifyCodeForReset);
router.put("/reset-password", userController.resetPassword);

export default router;