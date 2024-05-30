import { NextFunction, Request, Response } from "express";
import { prisma } from "../database";
import { AppError } from "../errors";

class EnsureTaskMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const task = await prisma.task.findFirst({
      where: { id },
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
    const categoryId = Number(req.body.categoryId);

    if (!categoryId) {
      return next();
    }

    const task = await prisma.task.findFirst({
      where: { categoryId },
    });

    if (!task) {
      throw new AppError("Category not found", 404);
    }
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
