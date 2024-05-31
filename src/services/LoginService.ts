import { compare } from "bcryptjs";
import { prisma } from "../database/database";
import { LoginBodyCreate } from "../interfaces";
import { sign } from "jsonwebtoken";
import { loginReturnSchema } from "../schemas";
import { AppError } from "../errors";
import { jwtConfig } from "../configs";

export class LoginService {
  private user = prisma.user;

  public login = async ({ email, password }: LoginBodyCreate) => {
    const foundUser = await this.user.findFirst({
      where: { email: email },
    });

    if (!foundUser) {
      throw new AppError("User not exists", 404);
    }

    const passwordMatch = await compare(password, foundUser.password);

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
