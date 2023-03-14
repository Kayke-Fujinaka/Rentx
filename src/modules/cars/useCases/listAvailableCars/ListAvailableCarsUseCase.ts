import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  name?: string;
  brand?: string;
}

class ListAvailableCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute({ category_id, name, brand }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      category_id,
      name,
      brand
    );

    return cars;
  }
}

export { ListAvailableCarsUseCase };
