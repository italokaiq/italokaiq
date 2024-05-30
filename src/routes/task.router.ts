import { Router } from "express";
import { TaskController } from "../controller";
import { ensure, ensureTask } from "../middlewares";
import { taskCreateSchema, taskUpadateSchema } from "../schemas";

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.use("/", ensure.isAuthenticaded);

taskRouter.post(
  "/",
  ensure.bodyIsValid(taskCreateSchema),
  ensureTask.idBodyExists,
  taskController.create
);
taskRouter.get("/", taskController.findMany);

taskRouter.use("/:id", ensureTask.idExists);

taskRouter.get("/:id", taskController.findOne);
taskRouter.patch(
  "/:id",
  ensure.bodyIsValid(taskUpadateSchema),
  ensureTask.isTaskOwner,
  taskController.update
);
taskRouter.delete("/:id", ensureTask.isTaskOwner, taskController.delete);
