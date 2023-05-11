import { Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import AppDataSource from "@shared/infra/typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      id,
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }

  async findAvailableCars(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("car")
      .where("available = :available", { available: true });

    if (category_id)
      carsQuery.andWhere("car.category_id = :category_id", { category_id });
    if (name) carsQuery.andWhere("car.name = :name", { name });
    if (brand) carsQuery.andWhere("car.brand = :brand", { brand });

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne({ where: { id } });
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
