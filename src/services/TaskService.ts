import { prisma } from "../database";
import { Task, TaskBodyCreate, TaskUpdate } from "../interfaces";
import { taskReturnSchema, taskSchema } from "../schemas";

export class TaskService {
  private prisma = prisma.task;

  public create = async (
    userId: number,
    payload: TaskBodyCreate
  ): Promise<Task> => {
    const newTask = { ...payload, userId };

    const create = await this.prisma.create({
      data: newTask,
    });
    return taskSchema.parse(create);
  };

  public findMany = async (
    userId: number,
    search?: string | undefined
  ): Promise<Task[]> => {
    if (search) {
      const taskSearchReturn = await this.prisma.findMany({
        where: {
          category: {
            name: { contains: search, mode: "insensitive" },
          },
        },
        include: {
          category: true,
        },
      });

      return taskReturnSchema.array().parse(taskSearchReturn);
    }

    const taskReturn = this.prisma.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });

    return taskReturnSchema.array().parse(taskReturn);
  };

  public findOne = async (task: Task): Promise<Task> => {
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
