import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../database/database";
import { AppError } from "../errors";

class AuthMiddleware {
  public isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
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

export const auth = new AuthMiddleware();
