import { prisma } from "../database";
import {
  Task,
  TaskBodyCreate,
  TaskBodyReturn,
  TaskUpdate,
} from "../interfaces";
import { taskReturnSchema, taskSchema } from "../schemas";

export class TaskService {
  private prisma = prisma.task;

  public create = async (
    payload: TaskBodyCreate,
    userId: number
  ): Promise<Task> => {
    const createTask = { ...payload, userId };

    const newTask = await this.prisma.create({
      data: createTask,
    });
    return taskSchema.parse(newTask);
  };

  public findMany = async (
    userId: number,
    search?: string | undefined
  ): Promise<TaskBodyReturn[]> => {
    if (search) {
      const taskSearchReturn = await this.prisma.findMany({
        where: {
          category: {
            name: { contains: search, mode: "insensitive" },
          },
        },
      });

      return taskReturnSchema.array().parse(taskSearchReturn);
    }

    const taskReturn = this.prisma.findMany({
      where: { userId },
    });

    return taskReturnSchema.array().parse(taskReturn);
  };

  public findOne = async (task: Task): Promise<TaskBodyReturn> => {
    const result = await this.prisma.findFirst({
      where: { id: task.id },
    });
    return taskReturnSchema.parse(result);
  };

  public update = async (id: number, payload: TaskUpdate): Promise<Task> => {
    const update = await this.prisma.update({
      where: { id },
      data: payload,
    });
    return taskSchema.parse(update);
  };

  public delete = async (id: number): Promise<void> => {
    await this.prisma.delete({
      where: { id },
    });
  };
}
