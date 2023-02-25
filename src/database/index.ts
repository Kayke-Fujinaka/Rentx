import { DataSource } from "typeorm";

import { Category } from "../modules/cars/entities/Category";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  username: "docker",
  password: "1234",
  database: "rentx",
  entities: [Category],
  migrations: ["src/database/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Initialized");
  })
  .catch((error) => console.log(error));

export default AppDataSource;
