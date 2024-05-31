import { z } from "zod";
import { taskCreateSchema, taskSchema, taskUpdateSchema } from "../schemas";

type Task = z.infer<typeof taskSchema>;
type TaskBodyCreate = z.infer<typeof taskCreateSchema>;
type TaskUpdate = z.infer<typeof taskUpdateSchema>;

export { Task, TaskBodyCreate, TaskUpdate };
