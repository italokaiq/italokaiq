import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(1),
});

export const userCreateSchema = userSchema.omit({
  id: true,
});

export const userReturnSchema = userSchema.omit({
  password: true,
});
