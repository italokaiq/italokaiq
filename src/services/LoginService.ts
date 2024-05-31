import { compare } from "bcryptjs";
import { prisma } from "../database";
import { LoginBodyCreate } from "../interfaces";
import { sign } from "jsonwebtoken";
import { loginReturnSchema } from "../schemas";
import { AppError } from "../errors";
import { jwtConfig } from "../configs";

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

    const { secret, expiresIn } = jwtConfig();

    const token = sign({ id: foundUser.id }, secret, { expiresIn: expiresIn });

    return loginReturnSchema.parse({
      accessToken: token,
      user: { id: foundUser.id, name: foundUser.name, email: foundUser.email },
    });
  };
}
