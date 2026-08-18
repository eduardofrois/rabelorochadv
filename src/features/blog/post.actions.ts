'use server';

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/features/auth/current-user";
import { prisma } from "@/lib/db/client";
import { postEditorSchema } from "./blog.schemas";

export async function createPostAction(formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return { ok: false, error: "Não autorizado" };
  }

  const parsed = postEditorSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    status: formData.get("status"),
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, error: "Dados inválidos" };
  }

  await prisma.post.create({
    data: {
      ...parsed.data,
      authorId: currentUser.id,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");

  return { ok: true };
}
