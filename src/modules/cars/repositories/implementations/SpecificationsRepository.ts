import AppDataSource from "@database";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { Repository } from "typeorm";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: { name },
    });

    return specification;
  }
}

export { SpecificationsRepository };
