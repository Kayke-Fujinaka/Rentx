import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

const connectionOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentx",
  logging: false,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
};

const AppDataSource = new DataSource(connectionOptions);

export async function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({
    host: process.env.DOCKER_CONTAINER ? "localhost" : host,
    database: process.env.DOCKER_CONTAINER
      ? "rentx"
      : AppDataSource.options.database.toString(),
  }).initialize();
}

export async function runQuery(query: string): Promise<void> {
  await AppDataSource.transaction(async (transactionalEntityManager) => {
    await transactionalEntityManager.query(query);
  });
}

export default AppDataSource;
