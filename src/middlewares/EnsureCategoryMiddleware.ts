import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/database";
import { AppError } from "../errors";

class EnsureCategoryMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const category = await prisma.category.findFirst({
      where: { id },
      include: { user: true },
    });

    if (!category) {
      throw new AppError("category not found", 404);
    }

    res.locals.category = category;

    return next();
  };

  public isCategoryOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { category, decoded } = res.locals;

    if (category.userId === decoded.id) {
      return next();
    }

    throw new AppError("Invalid permission.", 403);
  };
}

export const ensureCategory = new EnsureCategoryMiddleware();
