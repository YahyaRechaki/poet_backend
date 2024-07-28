import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import poetRoutes from "./routes/poetRoutes";

const startServer = async () => {
    try {
        AppDataSource.initialize().then(() => {
            console.log("Data Source has been initialized! 🚀");
        }).catch((err) => {
            console.error("Error during Data Source initialization:", err);
        });

        const app = express();
        app.use(express.json());

        app.use("/", poetRoutes);

        const port = 3000;
        const server = app.listen(port);

        server.on("error", (err) => {
            console.error("Error starting server:", err);
            process.exit(1); // Exit with error code
        });

        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1); // Exit with error code
    }
};

startServer();
