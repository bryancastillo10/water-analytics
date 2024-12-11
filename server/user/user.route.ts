import express from "express";
import { userController } from "@/user/user.config";
import { protectRoute } from "@/auth/auth.config";
import { upload } from "@/infrastructure/middleware/upload.middleware";

const router = express.Router();

router.put("/update/:id", protectRoute, userController.updateUser);
router.get("/", protectRoute, userController.getUser);
router.delete("/delete/:id",protectRoute, userController.deleteUser);
router.post("/request-reset-password", userController.requestResetPassword);
router.post("/verify-code", userController.verifyCodeForReset);
router.put("/reset-password", userController.resetPassword);
router.put("/profile-pic/:id", protectRoute, upload.single("profilePic"),userController.updateProfilePicture);

export default router;