import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import express, { json } from "express";
import { categoryRouter, loginRouter, taskRouter, userRouter } from "./routers";
import { handleErrors } from "./middlewares";

export const app = express();

app.use(helmet());
app.use(json());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/users/login", loginRouter);

app.use(handleErrors);
