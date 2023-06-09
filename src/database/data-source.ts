import { Entities } from "../entities";
import { DataSource, DataSourceOptions } from "typeorm";

export const DataSourceConfig:DataSourceOptions =  {
    type:"postgres",
    url:"postgres://root:123456@localhost:5432/db_tienda",
    entities:[...Entities],
    migrations:["src/database/migrations/*.ts"],
    synchronize:false,
    migrationsRun:true,
    dropSchema:true,
    logging:false,
    ssl:false,
}

export const AppDataSource = new DataSource(DataSourceConfig)

