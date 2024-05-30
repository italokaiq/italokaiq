import express, { json } from "express";
import { loginRouter, taskRouter, userRouter } from "./routes";

export const app = express();

app.use(json());
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
