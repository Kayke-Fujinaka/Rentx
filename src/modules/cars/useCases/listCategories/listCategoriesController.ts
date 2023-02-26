import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoriesUseCase } from "./listCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

      const categories = await listCategoriesUseCase.execute();

      return response.json(categories);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}

export { ListCategoriesController };
