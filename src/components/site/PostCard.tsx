import Link from "next/link";

type PostCardProps = {
  title: string;
  slug: string;
  excerpt: string;
};

export function PostCard({ title, slug, excerpt }: PostCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-[var(--color-line)] bg-[var(--color-surface-strong)] p-6 shadow-[0_14px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:border-[rgba(22,66,69,0.24)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.36em] text-[var(--color-brand)]">
        Artigo
      </p>
      <h2 className="mt-3 text-2xl font-semibold leading-tight text-[var(--color-ink)]">
        <Link className="outline-none focus-visible:underline" href={`/blog/${slug}`}>
          {title}
        </Link>
      </h2>
      <p className="mt-3 text-sm leading-7 text-[var(--color-muted)] sm:text-base">
        {excerpt}
      </p>
    </article>
  );
}
