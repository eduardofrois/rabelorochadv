import type { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/db/client";

export type CreateLeadInput = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  sourcePage: string;
};

export function createLead(input: CreateLeadInput, db: PrismaClient = prisma) {
  return db.lead.create({ data: input });
}

export function listLeads(db: PrismaClient = prisma) {
  return db.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
}
