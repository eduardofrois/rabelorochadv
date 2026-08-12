import type { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/db/client";

export function findActiveRedirect(sourcePath: string, db: PrismaClient = prisma) {
  return db.redirect.findFirst({
    where: {
      sourcePath,
      active: true,
    },
  });
}
