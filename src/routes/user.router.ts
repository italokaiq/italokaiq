import { Router } from "express";
import { UserController } from "../controller";

export const userRouter = Router();
const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.get("/", userController.getProfile);
