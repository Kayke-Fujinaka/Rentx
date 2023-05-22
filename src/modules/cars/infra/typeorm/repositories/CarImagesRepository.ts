import { Repository } from "typeorm";

import { CarImages } from "@modules/cars/infra/typeorm/entities/CarImages";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import AppDataSource from "@shared/infra/typeorm";

class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImages>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImages);
  }

  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImages = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImages);

    return carImages;
  }
}

export { CarImagesRepository };
