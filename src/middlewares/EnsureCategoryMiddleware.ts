import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { prisma } from "../database/database";

class EnsureCategoryMiddleware {
  public idExists = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.id;

    const category = await prisma.category.findFirst({
      where: { id: Number(categoryId) },
      include: { user: true },
    });

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    res.locals.category = category;

    next();
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
