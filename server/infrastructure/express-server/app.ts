import express from 'express';
import cors from "cors";
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import { errorHandler } from "@/infrastructure/middleware/errorHandler.middleware";

import authRoutes from "@/auth/auth.route";
import userRoutes from "@/user/user.route";
import measurementRoutes from "@/measurement/measurement.route";
import siteRoutes from "@/site/site.route";
import thresholdRoutes from "@/threshold/threshold.route";
import notesRoutes from "@/notes/notes.route";
import dashboardRoutes from "@/dashboard/dashboard.route";

export const startApp = () => {
    const app = express();

    // Security Middleware
    app.use(helmet());
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
    
    // Body Parser Middleware
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Core Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/water-quality-data", measurementRoutes);
    app.use("/api/site", siteRoutes);
    app.use("/api/threshold", thresholdRoutes);
    app.use("/api/notes", notesRoutes);
    app.use("/api/dashboard", dashboardRoutes);

    // Error Handler Middleware
    app.use(errorHandler);

    return app;
}