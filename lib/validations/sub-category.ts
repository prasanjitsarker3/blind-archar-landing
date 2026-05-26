import { z } from "zod";

export const subCategorySchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  categoryId: z.string().min(1, "Category is required"),
  slug: z.string().optional(),
});

export type SubCategoryFormValues = z.infer<typeof subCategorySchema>;
