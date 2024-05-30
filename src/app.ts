import express, { json } from "express";
import { categoryRouter, loginRouter, taskRouter, userRouter } from "./routes";
import { handleErrors } from "./middlewares";

export const app = express();

app.use(json());
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);

app.use(handleErrors);
