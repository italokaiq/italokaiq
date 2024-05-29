import { beforeEach, describe, it } from "vitest";
import { prisma } from "../../../database/prisma";
import { category } from "../../mocks/category.mocks";
import { request } from "../../setupFiles";

describe("delete category", () => {
  beforeEach(async () => {
    await prisma.category.create({ data: category });
  });

  it("should be able to delete category successfully", async () => {
    const category = await prisma.category.findFirst();
    await request.delete(`/categories/${category?.id}`).expect(204);
  });

  it("should throw error when try to delete a invalid category", async () => {
    await request.delete("/categories/999").expect(404);
  });
});
