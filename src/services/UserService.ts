import { hash } from "bcryptjs";
import { prisma } from "../database/database";
import { UserBodyCreate, UserReturn } from "../interfaces";
import { userReturnSchema } from "../schemas";

export class UserService {
  private prisma = prisma.user;

  public create = async (payload: UserBodyCreate): Promise<UserReturn> => {
    payload.password = await hash(payload.password, 10);

    const newUser = await this.prisma.create({
      data: payload,
    });

    return userReturnSchema.parse(newUser);
  };

  public getProfile = async (userId: number): Promise<UserReturn> => {
    const findUser = await this.prisma.findFirst({
      where: { id: userId },
    });
    return userReturnSchema.parse(findUser);
  };
}
