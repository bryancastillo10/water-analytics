import { AuthService } from "@/auth/core/service/authService";
import { CustomRequest } from "@/infrastructure/middleware/type";
import { Response, NextFunction } from "express";

export class AuthMiddleware{
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async protectRoute(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const token = req.cookies.jwt;
            if(!token) {
                return res.status(401).json({ error: "No token was provided" });
            };

            const user = await this.authService.validateUserToken(token);

            if (!user) {
                return res.status(401).json({ error: "Invalid or Expired token" });
            };

            req.user = user;
            next();

        } catch (error) {
            console.error("Authentication middleware error:", error);
            res.status(401).json({ error: "Authentication failed at the middleware" });
        }
    }
}