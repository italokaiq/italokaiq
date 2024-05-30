import { Router } from "express";
import { TaskController } from "../controller";

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post("/", taskController.create);
taskRouter.get("/", taskController.findMany);

taskRouter.get("/:id", taskController.findOne);
taskRouter.patch("/:id", taskController.update);
taskRouter.delete("/:id", taskController.delete);
