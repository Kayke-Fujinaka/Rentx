import { DataSource, DataSourceOptions } from "typeorm";

const appDataSource: DataSourceOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentx",
  migrations: ["src/database/migrations/*.ts"],
};

export const dataSource = new DataSource(appDataSource);
