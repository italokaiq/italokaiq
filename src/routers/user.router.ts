import { Router } from "express";
import { UserController } from "../controller";
import { ensure } from "../middlewares";
import { userCreateSchema } from "../schemas";

export const userRouter = Router();
const userController = new UserController();

userRouter.post(
  "/",
  ensure.bodyIsValid(userCreateSchema),
  ensure.emailExists,
  userController.create
);
userRouter.get("/profile", ensure.isAuthenticaded, userController.getProfile);
