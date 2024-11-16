import express from 'express';
import cors from "cors";
import helmet from 'helmet';


export const startApp = () => {
    const app = express();

    // Middlewares
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Core Routes


    return app
}