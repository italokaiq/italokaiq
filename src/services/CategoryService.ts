import { prisma } from "../database";
import { Category, CategoryBodyCreate } from "../interfaces";
import { categorySchema } from "../schemas";

export class CategoryService {
  private prisma = prisma.category;

  public create = async (payload: CategoryBodyCreate): Promise<Category> => {
    const newCategory = await this.prisma.create({
      data: payload,
    });

    return categorySchema.parse(newCategory);
  };

  public delete = async (id: number): Promise<void> => {
    const findUser = await this.prisma.delete({
      where: { id },
    });
  };
}
