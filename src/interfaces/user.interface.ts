import { z } from "zod";
import { userCreateSchema, userReturnSchema } from "../schemas";

type UserBodyCreate = z.infer<typeof userCreateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

export { UserBodyCreate, UserReturn };
