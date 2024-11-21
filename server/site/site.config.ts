import { SiteRepository } from "@/site/site.repository";
import { SiteService } from "@/site/service/siteService";
import { SiteController } from "@/site/site.controller";

import { AuthMiddleware } from "@/infrastructure/middleware/auth.middleware";
import { authService } from "@/auth/auth.config";

const siteRepository = new SiteRepository();

const siteService = new SiteService(siteRepository);
const middleware = new AuthMiddleware(authService);

export const siteController = new SiteController(siteService);
export const protectRoute = middleware.protectRoute;