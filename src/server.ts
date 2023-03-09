import "express-async-errors";
import "reflect-metadata";
import "./database";
import "./shared/container";

import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { HttpError } from "./errors/HttpError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof HttpError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.use(router);

app.listen(3333, () => console.log("Server running!"));
