import { DataSourceOptions } from "typeorm";


// DataSource
export const config: DataSourceOptions = {
    host: "",
    port: 0,
    database: '',
    synchronize: true,
    entities: ['src/entities/*.{ts|js}'],
    migrations: [
        'src/migrations/*.{ts|js}'
    ]
}
