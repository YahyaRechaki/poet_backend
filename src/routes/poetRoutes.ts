import { Router } from "express";
import { createPoet, getAllPoets } from "../controllers/poetsController";

const poetRoutes = Router();
// get all poets
poetRoutes.post('/poets', createPoet)
poetRoutes.get('/poets', getAllPoets)

export default poetRoutes