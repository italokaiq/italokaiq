import { z } from "zod";
import { categoryCreateSchema, categorySchema } from "../schemas";

type Category = z.infer<typeof categorySchema>;
type CategoryBodyCreate = z.infer<typeof categoryCreateSchema>;

export { Category, CategoryBodyCreate };
