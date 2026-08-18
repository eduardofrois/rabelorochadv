import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/site/PostCard";
import { listPublishedPosts } from "@/features/blog/blog.repository";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  return (
    <section className="mx-auto grid min-h-[60vh] max-w-7xl gap-10 px-6 py-16 lg:px-12 lg:py-20">
      <div className="grid gap-6">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
          Blog
        </h1>
        <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          Artigos e orientações jurídicas em linguagem objetiva, com foco em leitura
          útil e contexto prático.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              excerpt={post.excerpt}
              slug={post.slug}
              title={post.title}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-2xl rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface-strong)] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-brand)]">
            Em preparação
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">
            Os primeiros artigos serão publicados em breve. Enquanto isso, o escritório
            permanece disponível para uma conversa direta.
          </p>
          <div className="mt-6">
            <Button href="/contato">Fale com o escritório</Button>
          </div>
        </div>
      )}
    </section>
  );
}
