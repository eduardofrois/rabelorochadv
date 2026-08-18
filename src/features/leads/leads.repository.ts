import type { PrismaClient } from "@prisma/client";
import type { z } from "zod";
import { prisma } from "@/lib/db/client";
import { contactSchema } from "./leads.schemas";

export function createLead(input: z.infer<typeof contactSchema>, db: PrismaClient = prisma) {
  return db.lead.create({ data: input });
}
