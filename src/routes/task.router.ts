import { Router } from "express";
import { TaskController } from "../controller";

export const taskRouter = Router();
const taskController = new TaskController();

taskRouter.post("/", taskController);
taskRouter.get("/", taskController);

taskRouter.get("/:id", taskController);
taskRouter.patch("/:id", taskController);
taskRouter.delete("/:id", taskController);
