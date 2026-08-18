import { prisma } from "@/lib/db/client";

export async function listPublishedPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    include: { category: true, coverImage: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      category: true,
      coverImage: true,
      tags: { include: { tag: true } },
    },
  });
}
