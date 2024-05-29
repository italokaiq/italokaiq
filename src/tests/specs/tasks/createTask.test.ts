import { describe, it } from "vitest";
import {
   invalidDataTask,
   task,
   taskWithInvalidCategory,
} from "../../mocks/tasks.mocks";
import { request } from "../../setupFiles";
import { taskDefaultExpects } from "../../utils/taskDefaultExpects";

describe("create task", () => {
  it("should be able to create task successfully", async () => {
    const data = await request
      .post("/tasks")
      .send(task)
      .expect(201)
      .then((response) => response.body);

    taskDefaultExpects(data);
  });

  it("should throw error when try to create a task in a invalid category", async () => {
    await request.post("/tasks").send(taskWithInvalidCategory).expect(404);
  });

  it("should throw error when try to create a task with a missing body parameter", async () => {
    await request.post("/tasks").expect(400);
  });

  it("should throw error when try to create a task with invalid data types", async () => {
    await request.post("/tasks").send(invalidDataTask).expect(400);
  });
});
