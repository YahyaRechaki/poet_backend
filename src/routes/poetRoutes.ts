import { Router } from "express";
import {
    createPoet,
    getAllPoets,
    getPoetById,
    getTimeline,
} from "../controllers/poetsController";

const poetRoutes = Router();

// Timeline — returns all poets sorted chronologically, grouped by era.
// Optional query filters: ?era=Abbasid  ?religion=Islam  ?madhhab=Maliki  ?theme=romantic
poetRoutes.get("/timeline", getTimeline);

poetRoutes.post("/create", createPoet);
poetRoutes.get("/getAll", getAllPoets);
poetRoutes.get("/:id", getPoetById);

export default poetRoutes;
