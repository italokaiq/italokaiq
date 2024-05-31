import { Router } from "express";
import { taskCreateSchema, taskUpdateSchema } from "../schemas";
import { TaskController } from "../controller";
import { auth, ensure, ensureTask } from "../middlewares";

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.use("/", auth.isAuthenticated);

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
  ensure.bodyIsValid(taskUpdateSchema),
  ensureTask.isTaskOwner,
  taskController.update
);
taskRouter.delete("/:id", ensureTask.isTaskOwner, taskController.delete);
