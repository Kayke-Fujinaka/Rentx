import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "@modules/rentals/useCases";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { HttpError } from "@shared/errors/HttpError";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Test car",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another rental for the same user", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: "212121",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "321456",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new HttpError("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another rental for the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "313131",
      expected_return_date: dayAdd24Hours,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "313131",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new HttpError("There's a rental in progress for car!"));
  });

  it("should not be able to create a new rental with less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "321",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new HttpError("Invalid return time!"));
  });
});
