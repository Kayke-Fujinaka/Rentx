import dotenv from "dotenv";
import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";
import { Specification } from "../modules/cars/entities/Specification";

dotenv.config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DOCKER_CONTAINER ? process.env.DB_HOST : "localhost",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentx",
  entities: [Category, Specification],
  migrations: ["src/database/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Initialized");
  })
  .catch((error) => console.log(error));

export default AppDataSource;
