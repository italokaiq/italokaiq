import { Router } from "express";
import { LoginController } from "../controller";
import { ensure } from "../middlewares";
import { loginSchema } from "../schemas";

export const loginRouter = Router();
const userController = new LoginController();

loginRouter.post("/", ensure.bodyIsValid(loginSchema), userController.login);
