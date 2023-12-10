import { DataSource } from "typeorm";
import { config } from "./database_configuration";

let sharedDataSource: DataSource;

export const getSharedDataSource = async () => {
    if (!sharedDataSource) {
        sharedDataSource = new DataSource(config);
    
        await sharedDataSource.initialize();
    }

    return sharedDataSource;
}