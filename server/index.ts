import dotenv from "dotenv";

import { connectToDb } from "@/infrastructure/database/connectToDb";
import { startApp } from "@/infrastructure/express-server/app";

dotenv.config();
const initializeServer = async () => {
    try {
        await connectToDb();

        const app = startApp();
        const port = process.env.PORT

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server', error);
        process.exit(1);
    }
};

initializeServer();