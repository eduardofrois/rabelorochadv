import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(30).optional(),
  subject: z.string().min(2).max(160),
  message: z.string().min(10).max(2000),
  sourcePage: z.string().min(1).max(240),
});
