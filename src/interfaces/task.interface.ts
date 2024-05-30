import { z } from "zod";
import {
  taskCreateSchema,
  taskReturnSchema,
  taskSchema,
  taskUpadateSchema,
} from "../schemas";

type Task = z.infer<typeof taskSchema>;
type TaskBodyCreate = z.infer<typeof taskCreateSchema>;
type TaskBodyReturn = z.infer<typeof taskReturnSchema>;
type TaskUpdate = z.infer<typeof taskUpadateSchema>;

export { Task, TaskBodyCreate, TaskBodyReturn, TaskUpdate };
