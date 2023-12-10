import { DataSourceOptions } from "typeorm";

import path from 'path';;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ScrapItem } from "./entities/ScrapItem";
import { User } from "./entities/User";

// DataSource
export const config: DataSourceOptions = {
    host: "localhost",
    port: 5432,
    database: 'scrap',
    type: 'postgres',
    username: 'postgres',
    password: 'p@ssw0rd',
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
