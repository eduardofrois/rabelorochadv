import { notFound } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { getPublishedPostBySlug } from "@/features/blog/blog.repository";
import { postSlugSchema } from "@/features/blog/blog.schemas";

export const dynamic = "force-dynamic";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const parsedSlug = postSlugSchema.safeParse(slug);
  if (!parsedSlug.success) {
    notFound();
  }

  const post = await getPublishedPostBySlug(parsedSlug.data);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto grid min-h-[60vh] max-w-5xl gap-8 px-6 py-16 lg:px-12 lg:py-20">
      <header className="grid gap-5">
        <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--color-brand)]">
          Blog
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
          {post.title}
        </h1>
        <p className="max-w-3xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          {post.excerpt}
        </p>
      </header>

      <div className="grid gap-8 rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface-strong)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)] lg:p-8">
        <div className="grid gap-3 text-sm text-[var(--color-muted)] sm:grid-cols-2">
          {post.category ? (
            <p>
              Categoria: <span className="text-[var(--color-ink)]">{post.category.name}</span>
            </p>
          ) : null}
          <p>
            Publicado em:{" "}
            <span className="text-[var(--color-ink)]">
              {post.publishedAt ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(post.publishedAt) : "-"}
            </span>
          </p>
        </div>

        <div className="space-y-6 text-base leading-8 text-[var(--color-ink)] sm:text-lg">
          {post.content.split(/\n\s*\n/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div>
        <Button href="/contato">Fale com o escritório</Button>
      </div>
    </article>
  );
}
