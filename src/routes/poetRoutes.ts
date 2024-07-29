import { Request, Response, Router } from "express";
import { createPoet, getAllPoets } from "../controllers/poetsController";

const poetRoutes = Router();

poetRoutes.post('/create', createPoet);
poetRoutes.get('/getAll', getAllPoets);

export default poetRoutes