import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { HttpError } from "@shared/errors/HttpError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "0123456789",
    });
  });

  it("should not be able to create a new car with same license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car 1",
        description: "Description Car 1",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "0123456789",
      });

      await createCarUseCase.execute({
        name: "Name Car 2",
        description: "Description Car 2",
        daily_rate: 150,
        license_plate: "ABC-1234",
        fine_amount: 120,
        brand: "Brand",
        category_id: "0123456789",
      });
    }).rejects.toBeInstanceOf(HttpError);
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "0123456789",
    });

    expect(car.available).toBe(true);
  });
});
