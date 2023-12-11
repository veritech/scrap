import { DataSourceOptions } from "typeorm";

import path from 'path';;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ScrapItem } from "./entities/ScrapItem";
import { User } from "./entities/User";

const {
    PGHOST,
    PGPORT = '5432',
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

// DataSource
export const config: DataSourceOptions = {
    host: PGHOST || "localhost",
    port: parseInt(PGPORT),
    database: POSTGRES_DB || 'scrap',
    type: 'postgres',
    username: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || 'p@ssw0rd',
    synchronize: true,
    entities: [
        ScrapItem,
        User
        // __dirname + '/entities/*.{ts|js}'
    ],
    migrations: [
        __dirname + '/migrations/*.{ts|js}'
    ]
}
