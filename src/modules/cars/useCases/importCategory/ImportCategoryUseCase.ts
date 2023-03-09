import { parse as csvParse } from "csv-parse";
import fs from "node:fs";
import { inject, injectable } from "tsyringe";

import { HttpError } from "../../../../errors/HttpError";
import { deleteFile } from "../../../../utils/file";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(file: Express.Multer.File): Promise<void> {
    const stream = fs.createReadStream(file.path);
    const categories: IImportCategory[] = [];

    const parseFile = csvParse();

    stream.pipe(parseFile);

    try {
      await new Promise((resolve, reject) => {
        parseFile
          .on("data", async (line) => {
            const [name, description] = line;

            categories.push({ name, description });
          })
          .on("end", () => {
            if (file.path) deleteFile(file.path);
            resolve(categories);
          })
          .on("error", (err) => {
            reject(err);
          });
      });

      await Promise.all(
        categories.map(async (category) => {
          const { name, description } = category;

          const existCategory = await this.categoriesRepository.findByName(
            name
          );

          if (!existCategory) {
            await this.categoriesRepository.create({
              name,
              description,
            });
          }
        })
      );
    } catch (error) {
      throw new HttpError("Network error!", 500);
    }
  }
}

export { ImportCategoryUseCase };
