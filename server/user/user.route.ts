import express from "express";
import { userController } from "@/user/user.config";

const router = express.Router();

router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", userController.deleteUser);

export default router;