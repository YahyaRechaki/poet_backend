import "reflect-metadata";
import fs from "fs";
import path from "path";
import { AppDataSource } from "../config/data-source";
import { Poet } from "../entity/Poet";

const importPoets = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        const filePath = path.join(__dirname, '../seed/poets.json');
        console.log(`Importing data from ${filePath}...`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const poets: Poet[] = JSON.parse(fileContent);

        for (const poet of poets) {
            const poetEntity = AppDataSource.getRepository(Poet).create(poet);
            await AppDataSource.getRepository(Poet).save(poetEntity);
        }

        console.log("Poets have been imported!");
        await AppDataSource.destroy();
    } catch (err) {
        console.error("Error during Data Source initialization or data import:", err);
    }
};

importPoets();
