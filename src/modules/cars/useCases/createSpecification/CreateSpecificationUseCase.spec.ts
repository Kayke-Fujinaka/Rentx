import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    );
  });

  it("should be able to create a new specification", async () => {
    const specification = {
      name: "Specification Test",
      description: "Specification Descriptio Test",
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    const specificationCreated =
      await specificationsRepositoryInMemory.findByName(specification.name);

    expect(specificationCreated).toHaveProperty("id");
  });
});
