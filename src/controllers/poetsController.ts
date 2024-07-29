import { Request, Response } from "express";
import { Poet } from "../entity/Poet";
import { AppDataSource } from "../config/data-source";

export async function createPoet(req: Request, res: Response): Promise<void> {
    
}

export async function getAllPoets(req: Request, res: Response): Promise<Poet[]> {
    const poetRepository = AppDataSource.getRepository(Poet)
    const allPoets = await poetRepository.find()
    return allPoets
}