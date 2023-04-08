import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { HttpError } from "@shared/errors/HttpError";

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
  }: IRequest): Promise<void> {
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
  }
}

export { CreateRentalUseCase };
