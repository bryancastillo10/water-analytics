import express from 'express';
import cors from "cors";
import helmet from 'helmet';

import authRoutes from "@/auth/auth.route";

export const startApp = () => {
    const app = express();

    // Middlewares
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Core Routes
    app.use("/api/auth", authRoutes)

    return app
}