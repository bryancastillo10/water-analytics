import { AuthRepository } from "@/auth/auth.repository";
import { AuthService } from "@/auth/core/service/authService";
import { AuthController } from "@/auth/auth.controller";
import { AuthMiddleware } from "@/infrastructure/middleware/auth.middleware";

const authRepository = new AuthRepository();

const authService = new AuthService(authRepository);
const middleware = new AuthMiddleware(authService);

export const authController = new AuthController(authService);
export const protectRoute = middleware.protectRoute;
