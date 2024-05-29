import { beforeEach, describe, it } from "vitest";
import { prisma } from "../../../database/prisma";
import { task } from "../../mocks/tasks.mocks";
import { request } from "../../setupFiles";

describe("delete task", () => {
  beforeEach(async () => {
    await prisma.task.create({ data: task });
  });

  it("should be able to delete task successfully", async () => {
    const task = await prisma.task.findFirst();
    await request.delete(`/tasks/${task?.id}`).expect(204);
  });

  it("should throw error when try to delete a invalid task", async () => {
    await request.delete(`/tasks/999`).expect(404);
  });
});
