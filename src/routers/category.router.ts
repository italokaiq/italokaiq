import { Router } from "express";
import { CategoryController } from "../controller";
import { ensure, ensureCategory } from "../middlewares";
import { categoryCreateSchema } from "../schemas";

export const categoryRouter = Router();
const userController = new CategoryController();

categoryRouter.use("/", ensure.isAuthenticaded);

categoryRouter.post(
  "/",
  ensure.bodyIsValid(categoryCreateSchema),
  userController.create
);
categoryRouter.get(
  "/:id",
  ensureCategory.idExists,
  ensureCategory.isCategoryOwner,
  userController.delete
);
