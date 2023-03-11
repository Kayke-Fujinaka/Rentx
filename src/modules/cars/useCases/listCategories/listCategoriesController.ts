import { ListCategoriesUseCase } from "@modules/cars/useCases";
import { Request, Response } from "express";
import { container } from "tsyringe";

class ListCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const categories = await listCategoriesUseCase.execute();

    return response.json(categories);
  }
}

export { ListCategoriesController };
