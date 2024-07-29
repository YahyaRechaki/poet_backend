import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./config/data-source";
import poetRoutes from "./routes/poetRoutes";

const initializeDataSource = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized! 🚀");
    } catch (error) {
        console.error("Error during Data Source initialization:", error);
        process.exit(1); // Exit with error code
    }
};

const startServer = async () => {
    await initializeDataSource();

    const app = express();
    app.use(express.json());

    app.use("/api/poets", poetRoutes);

    const port = 3000;
    const server = app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    server.on("error", (err) => {
        console.error("Error starting server:", err);
        process.exit(1); // Exit with error code
    });
};

startServer();
