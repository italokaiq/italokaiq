import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/database";

export class EnsureMiddleware {
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

  public isAuthenticaded = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError("Invalid token", 401);
    }

    const [_, token] = authorization.split(" ");

    const secret = process.env.JWT_SECRET!;

    res.locals.decoded = verify(token, secret);

    return next();
  };

  public isUserOwner = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { decoded } = res.locals;
    const { userId } = req.params;

    if (Number(decoded.id) !== Number(userId)) {
      throw new AppError(
        "You dont have permission to perform this action",
        403
      );
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(decoded.id) },
    });

    res.locals = { ...res.locals, user };

    return next();
  };
}

export const ensure = new EnsureMiddleware();
