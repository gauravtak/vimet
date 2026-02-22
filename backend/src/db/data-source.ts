import { config } from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";

config({
    path: `.${process.env["NODE_ENV"]}.env`,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [__dirname + "/entities/*{.js,.ts}"],
    migrations: [__dirname + "/migrations/*{.js,.ts}"],
});
