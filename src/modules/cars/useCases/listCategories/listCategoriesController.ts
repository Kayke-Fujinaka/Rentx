import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./listCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response) {
    try {
      const categories = this.listCategoriesUseCase.execute();

      return response.json(categories);
    } catch (error) {
      return response.status(error.statusCode).json({ error: error.message });
    }
  }
}

export { ListCategoriesController };
