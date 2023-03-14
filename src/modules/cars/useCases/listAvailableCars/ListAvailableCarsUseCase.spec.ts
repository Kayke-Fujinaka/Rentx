import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Name Car 1",
      description: "Description Car 1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car1_brand",
      category_id: "0123456789",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Name Car 2",
      description: "Description Car 2",
      daily_rate: 80,
      license_plate: "DEF-5678",
      fine_amount: 40,
      brand: "Car2_brand",
      category_id: "9876543210",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it("should be able to list all available cars by category id", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Name Car 1",
      description: "Description Car 1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car1_brand",
      category_id: "0123456789",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Name Car 2",
      description: "Description Car 2",
      daily_rate: 80,
      license_plate: "DEF-5678",
      fine_amount: 40,
      brand: "Car2_brand",
      category_id: "9876543210",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "0123456789",
    });

    expect(cars).toEqual([car1]);
    expect(cars).not.toEqual([car2]);
  });

  it("should be able to list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Name Car 1",
      description: "Description Car 1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car1_brand",
      category_id: "0123456789",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Name Car 2",
      description: "Description Car 2",
      daily_rate: 80,
      license_plate: "DEF-5678",
      fine_amount: 40,
      brand: "Car2_brand",
      category_id: "9876543210",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Name Car 2",
    });

    expect(cars).toEqual([car2]);
    expect(cars).not.toEqual([car1]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Name Car 1",
      description: "Description Car 1",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car_brand",
      category_id: "0123456789",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Name Car 2",
      description: "Description Car 2",
      daily_rate: 80,
      license_plate: "DEF-5678",
      fine_amount: 40,
      brand: "Car_brand",
      category_id: "9876543210",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car1, car2]);
  });
});
