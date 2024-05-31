import { Router } from "express";
import { userCreateSchema } from "../schemas";
import { UserController } from "../controller";
import { ensure, auth } from "../middlewares";

export const userRouter = Router();
const userController = new UserController();

userRouter.post(
  "/",
  ensure.bodyIsValid(userCreateSchema),
  ensure.emailExists,
  userController.create
);

userRouter.get("/profile", auth.isAuthenticated, userController.getProfile);
