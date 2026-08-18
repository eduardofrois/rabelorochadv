import { z } from "zod";

export const postSlugSchema = z
  .string()
  .min(3)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const postEditorSchema = z.object({
  title: z.string().min(3).max(160),
  slug: postSlugSchema,
  excerpt: z.string().min(20).max(240),
  content: z.string().min(50),
  status: z.enum(["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"]),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
});
