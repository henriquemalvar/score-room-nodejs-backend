import 'dotenv/config';
import { DataSource } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

const entitiesDir = path.join(__dirname, './models');
const entityFiles = fs.readdirSync(entitiesDir).filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

const entities = entityFiles.map((file) => {
    const entity = require(path.join(entitiesDir, file));
    return entity.default || entity;
});

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: entities,
    subscribers: [],
    migrations: ["./migrations/"],
})
