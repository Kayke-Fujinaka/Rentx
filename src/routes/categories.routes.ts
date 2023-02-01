import { Request, Response, Router } from "express";
import { randomUUID } from "node:crypto";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (request: Request, response: Response) => {
  const { name, description } = request.body;

  const category = {
    id: randomUUID(),
    name,
    description,
    created_at: new Date(),
  };

  categories.push(category);

  return response.status(201).send();
});

export { categoriesRoutes };
