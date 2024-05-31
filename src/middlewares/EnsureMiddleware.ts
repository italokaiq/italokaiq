import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { prisma } from "../database/database";
import { AppError } from "../errors";

class EnsureMiddleware {
  public bodyIsValid =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction): void => {
      req.body = schema.parse(req.body);

      return next();
    };

  public emailExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const email = req.body.email;
    const existsEmail = await prisma.user.findFirst({ where: { email } });

    if (existsEmail) {
      throw new AppError("This email is already registered", 409);
    }

    next();
  };
}

export const ensure = new EnsureMiddleware();
