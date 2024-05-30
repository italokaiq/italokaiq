import { Router } from "express";
import { CategoryController } from "../controller";

export const categoryRouter = Router();
const userController = new CategoryController();

categoryRouter.post("/", userController.create);
categoryRouter.get("/:id", userController.delete);
