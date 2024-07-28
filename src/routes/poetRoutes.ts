import { Router } from "express";
import { createPoet } from "../controllers/poetsController";

const poetRoutes = Router();
// get all poets
poetRoutes.post('/poets', createPoet)

export default poetRoutes