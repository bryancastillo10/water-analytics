import express from "express";
import { userController } from "@/user/user.config";

const router = express.Router();

router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/request-reset-password", userController.requestResetPassword)

export default router;