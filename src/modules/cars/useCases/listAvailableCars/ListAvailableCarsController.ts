import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "@modules/cars/useCases";

class ListAvailableCarsController {
  async handle(request: Request, response: Response) {
    const { brand, name, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      category_id: category_id as string,
      name: name as string,
      brand: brand as string,
    });

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
