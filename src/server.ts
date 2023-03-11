import "express-async-errors";
import "reflect-metadata";
import "./database";
import "./shared/container";

import { HttpError } from "@errors/HttpError";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal Server Error: ${error.message}`,
  });
});

app.listen(3333, () => console.log("Server running!"));
