export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between gap-6 border-b border-[var(--color-line)] pb-5">
          <p className="text-sm font-semibold uppercase text-[var(--color-brand)]">
            Rabelo & Rocha Advogados
          </p>
          <nav aria-label="Navegação principal" className="hidden gap-6 text-sm md:flex">
            <a href="/escritorio">Escritório</a>
            <a href="/areas-de-atuacao">Áreas de atuação</a>
            <a href="/blog">Blog</a>
            <a href="/contato">Contato</a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase text-[var(--color-brand)]">
              Direito, Inovação e Tecnologia
            </p>
            <h1 className="text-5xl font-semibold leading-tight text-balance sm:text-6xl">
              Rabelo & Rocha Advogados
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-muted)]">
              Atuação jurídica estratégica para pessoas e empresas que precisam
              de orientação clara, proximidade no atendimento e solidez técnica.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex min-h-12 items-center justify-center bg-[var(--color-brand)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-strong)]"
                href="/contato"
              >
                Fale com o escritório
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center border border-[var(--color-line)] px-5 text-sm font-semibold transition hover:border-[var(--color-brand)]"
                href="/areas-de-atuacao"
              >
                Ver áreas de atuação
              </a>
            </div>
          </div>

          <div className="border-l-4 border-[var(--color-brand)] bg-white p-8 shadow-sm">
            <p className="text-sm uppercase text-[var(--color-muted)]">Fundação técnica</p>
            <ul className="mt-6 space-y-5 text-base leading-7">
              <li>Next.js App Router com TypeScript.</li>
              <li>Design tokens iniciais da marca institucional.</li>
              <li>Base preparada para blog, admin, PostgreSQL e Docker.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
