import express from "express";
import { userController } from "@/user/user.config";

const router = express.Router();

router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

export default router;