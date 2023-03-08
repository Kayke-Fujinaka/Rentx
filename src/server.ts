import "reflect-metadata";
import "./database";
import "./shared/container";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import { HttpError } from "./shared/utils/HttpError";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof HttpError)
      return response.status(error.statusCode).json({ message: error.message });

    return response.status(500).json({ message: "Internal server error" });
  }
);

app.use(router);

app.listen(3333, () => console.log("Server running!"));
