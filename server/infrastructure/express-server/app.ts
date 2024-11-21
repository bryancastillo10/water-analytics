import express from 'express';
import cors from "cors";
import helmet from 'helmet';
import cookieParser from "cookie-parser";

import authRoutes from "@/auth/auth.route";
import userRoutes from "@/user/user.route";
import measurementRoutes from "@/measurement/measurement.route";
import siteRoutes from "@/site/site.route";

export const startApp = () => {
    const app = express();

    // Middlewares
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    // Core Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/data", measurementRoutes);
    app.use("/api/site", siteRoutes);

    return app
}