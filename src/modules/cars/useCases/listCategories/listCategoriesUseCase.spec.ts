import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";
import { ListCategoriesUseCase } from "./listCategoriesUseCase";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;
let listCategoriesUseCase: ListCategoriesUseCase;

describe("List Categories", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
    listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to list categories", async () => {
    const category: ICreateCategoryDTO = {
      name: "Category Name Test",
      description: "Category Description Test",
    };

    await createCategoryUseCase.execute(category);

    const categories = await listCategoriesUseCase.execute();

    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: category.name,
          description: category.description,
        }),
      ])
    );
  });
});
