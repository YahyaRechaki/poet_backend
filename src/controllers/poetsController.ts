import { Request, Response } from "express";
import { Poet } from "../entity/Poet";
import { AppDataSource } from "../config/data-source";

export async function createPoet(req: Request, res: Response): Promise<void> {
    try {
        const poetRepository = AppDataSource.getRepository(Poet);
        const newPoet = poetRepository.create(req.body);
        await poetRepository.save(newPoet);
        res.status(201).json(newPoet);
    } catch (error) {
        console.error("Error creating poet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getAllPoets(req: Request, res: Response): Promise<void> {
    try {
        const poetRepository = AppDataSource.getRepository(Poet);
        const allPoets = await poetRepository.find();
        res.status(200).json(allPoets);
    } catch (error) {
        console.error("Error fetching poets:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
