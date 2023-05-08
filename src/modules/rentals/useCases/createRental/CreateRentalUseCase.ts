import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { HttpError } from "@shared/errors/HttpError";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const rentalOpenByCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (rentalOpenByCar)
      throw new HttpError("There's a rental in progress for car!");

    const rentalOpenByUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenByUser)
      throw new HttpError("There's a rental in progress for user!");

    const expectedReturnDateFormat = dayjs(expected_return_date)
      .utc()
      .local()
      .format();

    const dateNow = dayjs().utc().local().format();

    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

    if (compare < minimumHour) {
      throw new HttpError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
