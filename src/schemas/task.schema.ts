import { z } from "zod";
import { categorySchema } from "./category.schema";

export const taskSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(255),
  content: z.string().min(255),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().nullish(),
  userId: z.number().positive(),
});

export const taskCreateSchema = taskSchema.omit({
  id: true,
  userId: true,
});

export const taskUpadateSchema = taskCreateSchema.partial();

export const taskReturnSchema = taskSchema
  .extend({
    category: categorySchema.nullish(),
  })
  .omit({ categoryId: true });
