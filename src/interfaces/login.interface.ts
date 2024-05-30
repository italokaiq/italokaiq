import { z } from "zod";
import { loginReturnSchema, loginSchema } from "../schemas";

type LoginBodyCreate = z.infer<typeof loginSchema>;
type LoginBodyReturn = z.infer<typeof loginReturnSchema>;

export { LoginBodyCreate, LoginBodyReturn };
