import { Router } from "express";
import { categoryCreateSchema } from "../schemas";
import { CategoryController } from "../controller";
import { auth, ensure, ensureCategory } from "../middlewares";

export const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.use("", auth.isAuthenticated);

categoryRouter.post(
  "/",
  ensure.bodyIsValid(categoryCreateSchema),
  categoryController.create
);
categoryRouter.delete(
  "/:id",
  ensureCategory.idExists,
  ensureCategory.isCategoryOwner,
  categoryController.delete
);
