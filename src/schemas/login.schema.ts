import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(5, "min 5 caracters"),
});

export const loginReturnSchema = z.object({
  accessToken: z.string().min(1),
  user: z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().min(1),
  }),
});
