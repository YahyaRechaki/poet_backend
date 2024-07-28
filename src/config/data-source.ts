import { DataSource } from "typeorm";
import { Poet } from "../entity/Poet";
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    database: process.env.DATABASE_NAME,
    url: process.env.DATABASE_URL,
    entities: [Poet],
    synchronize: process.env.DATABASE_SYNCHRONIZE === "true", // remove in production
    entityPrefix: "entity_",
    // migrations: ["src/migrations/*.ts"], // ADD in production instead of synchronize
})

