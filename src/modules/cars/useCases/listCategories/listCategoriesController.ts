import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./listCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(request: Request, response: Response) {
    const categories = this.listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };