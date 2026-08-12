import type { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/db/client";

const publicPostInclude = {
  author: { select: { id: true, name: true, email: true } },
  category: true,
  coverImage: true,
  tags: { include: { tag: true } },
} as const;

export function listPublishedPosts(db: PrismaClient = prisma) {
  return db.post.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: new Date() },
    },
    include: publicPostInclude,
    orderBy: { publishedAt: "desc" },
  });
}

export function getPublishedPostBySlug(slug: string, db: PrismaClient = prisma) {
  return db.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      publishedAt: { lte: new Date() },
    },
    include: publicPostInclude,
  });
}

export function listAdminPosts(db: PrismaClient = prisma) {
  return db.post.findMany({
    include: {
      author: { select: { id: true, name: true, email: true } },
      category: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}
