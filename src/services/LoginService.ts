import { compare } from "bcryptjs";
import { prisma } from "../database";
import { LoginBodyCreate } from "../interfaces";
import { sign } from "jsonwebtoken";
import { loginReturnSchema } from "../schemas";
import { AppError } from "../errors";

export class LoginService {
  private prisma = prisma.user;

  public login = async (payload: LoginBodyCreate) => {
    const foundUser = await this.prisma.findFirst({
      where: { email: payload.email },
    });

    if (!foundUser) {
      throw new AppError("User not exists", 404);
    }

    const passwordMatch = compare(payload.password, foundUser.password);

    if (!passwordMatch) {
      throw new AppError("Email and password doesn't match", 401);
    }

    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.EXPIRES_IN;

    if (!secret) {
      throw new Error("Missing JWT enviroment variable `JWT_SECRET_KEY`");
    }

    const token = sign({ id: foundUser.id }, secret, { expiresIn: expiresIn });

    return loginReturnSchema.parse({
      accessToken: token,
      user: { id: foundUser.id, name: foundUser.name, email: foundUser.email },
    });
  };
}
