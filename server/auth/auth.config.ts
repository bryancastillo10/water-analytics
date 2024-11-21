import { AuthRepository } from "@/auth/auth.repository";
import { AuthService } from "@/auth/core/service/authService";
import { AuthController } from "@/auth/auth.controller";

const authRepository = new AuthRepository();

export const authService = new AuthService(authRepository);

export const authController = new AuthController(authService);
