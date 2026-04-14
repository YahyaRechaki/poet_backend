import { Request, Response } from "express";
import { Poet } from "../entity/Poet";
import { AppDataSource } from "../config/data-source";

const ERA_ORDER = [
    "Jahiliyyah",
    "Sadr al-Islam",
    "Umayyad",
    "Abbasid",
    "Andalusian",
    "Ayyubid",
    "Mamluk",
    "Ottoman",
    "Modern",
    "Contemporary",
];

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

export async function getPoetById(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const poetRepository = AppDataSource.getRepository(Poet);
        const poet = await poetRepository.findOneBy({ id: id as any });
        if (!poet) {
            res.status(404).json({ error: "Poet not found" });
            return;
        }
        res.status(200).json(poet);
    } catch (error) {
        console.error("Error fetching poet:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getTimeline(req: Request, res: Response): Promise<void> {
    try {
        const poetRepository = AppDataSource.getRepository(Poet);
        const { era, religion, madhhab, theme } = req.query;

        const queryBuilder = poetRepository.createQueryBuilder("poet");

        if (era) {
            queryBuilder.andWhere(":era = ANY(poet.era)", { era: String(era) });
        }
        if (religion) {
            queryBuilder.andWhere("LOWER(poet.religion) LIKE LOWER(:religion)", {
                religion: `%${String(religion)}%`,
            });
        }
        if (madhhab) {
            queryBuilder.andWhere("LOWER(poet.madhhab) LIKE LOWER(:madhhab)", {
                madhhab: `%${String(madhhab)}%`,
            });
        }
        if (theme) {
            queryBuilder.andWhere(":theme = ANY(poet.\"poetryThemes\")", {
                theme: String(theme),
            });
        }

        queryBuilder.orderBy("poet.bornYear", "ASC", "NULLS LAST");

        const poets = await queryBuilder.getMany();

        // Group poets by their primary era, preserving the canonical era order
        const grouped: Record<string, Poet[]> = {};
        for (const poet of poets) {
            const primaryEra = poet.era?.[0] ?? "Unknown";
            if (!grouped[primaryEra]) grouped[primaryEra] = [];
            grouped[primaryEra].push(poet);
        }

        // Build ordered timeline sections
        const timeline = ERA_ORDER.filter((e) => grouped[e]).map((e) => ({
            era: e,
            poets: grouped[e],
        }));

        // Append any eras not in the canonical order
        Object.keys(grouped)
            .filter((e) => !ERA_ORDER.includes(e))
            .forEach((e) => timeline.push({ era: e, poets: grouped[e] }));

        res.status(200).json({ total: poets.length, timeline });
    } catch (error) {
        console.error("Error building timeline:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
