import "express-async-errors";
import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import "@shared/container";
import { HttpError } from "@shared/errors/HttpError";
import { createConnection } from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection()
  .then(() => {
    console.log("Data Source has been initialized");
  })
  .catch((e) => {
    console.log("Error initializing Data Source", e);
  });

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal Server Error: ${error.message}`,
  });
});

export { app };
