import { z } from "zod";

export const categorySchema = z.object({
  id: z.number().positive(),
  name: z.string().min(255),
  userId: z.number().positive(),
});

export const categoryCreateSchema = categorySchema.omit({
  id: true,
});
