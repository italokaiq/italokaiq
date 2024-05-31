import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { prisma } from "../database/database";

class EnsureTaskMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const task = await prisma.task.findFirst({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!task) {
      throw new AppError("task not found", 404);
    }

    res.locals.task = task;

    return next();
  };

  public idBodyExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { categoryId } = req.body;
    if (!categoryId) {
      return next();
    }
    const task = await prisma.task.findFirst({
      where: { id: Number(categoryId) },
    });

    if (!task) {
      throw new AppError("Category not found", 404);
    }

    next();
  };

  public isTaskOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { task, decoded } = res.locals;

    if (task.userId === decoded.id) {
      return next();
    }

    throw new AppError("Invalid permission.", 403);
  };
}

export const ensureTask = new EnsureTaskMiddleware();
