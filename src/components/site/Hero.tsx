import { Button } from "@/components/ui/Button";

const highlights = [
  {
    title: "Leitura clara do risco",
    description: "Estrutura institucional para orientar decisões com precisão e contexto.",
  },
  {
    title: "Atendimento próximo",
    description: "Contato direto, linguagem objetiva e acompanhamento consistente.",
  },
  {
    title: "Visão contemporânea",
    description: "Direito, inovação e tecnologia em uma única direção de marca.",
  },
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,66,69,0.08),transparent_35%),radial-gradient(circle_at_top_right,rgba(22,66,69,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.24),transparent_30%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-5.75rem)] max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-24">
        <div className="flex flex-col justify-end">
          <p className="text-xs font-semibold uppercase tracking-[0.48em] text-[var(--color-brand)]">
            Direito, Inovação e Tecnologia
          </p>

          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[0.92] text-[var(--color-ink)] sm:text-6xl lg:text-7xl">
            Direito, inovação e tecnologia.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
            Atuação jurídica institucional para empresas e pessoas que precisam de
            orientação clara, estratégia consistente e proximidade real no atendimento.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/contato">Fale com o escritório</Button>
            <Button href="/areas-de-atuacao" variant="secondary">
              Ver áreas de atuação
            </Button>
          </div>
        </div>

        <div className="relative flex items-end">
          <div className="absolute inset-y-10 left-5 hidden w-px bg-[linear-gradient(to_bottom,transparent,rgba(22,66,69,0.55),transparent)] lg:block" />

          <div className="ml-auto w-full max-w-xl rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-soft)] backdrop-blur sm:p-6">
            <div className="grid gap-5">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-black/10 bg-[linear-gradient(165deg,var(--color-brand),#020202)] p-6 text-[var(--color-paper)] shadow-[0_30px_60px_rgba(0,0,0,0.22)]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.14),transparent_32%),radial-gradient(circle_at_top_right,rgba(229,229,229,0.14),transparent_26%)]"
                />

                <div className="relative flex h-full min-h-80 flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.36em] text-white/70">
                      Estrutura editorial
                    </p>
                    <div className="mt-8 h-px w-24 bg-white/20" />
                  </div>

                  <div className="grid gap-3">
                    {highlights.map((item) => (
                      <article
                        key={item.title}
                        className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm"
                      >
                        <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-white/70">
                          {item.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <article className="rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-surface-strong)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-brand)]">
                    Presença
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                    Um site institucional pensado para leitura rápida e decisão segura.
                  </p>
                </article>

                <article className="rounded-[1.4rem] border border-[var(--color-line)] bg-[var(--color-paper-soft)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-brand)]">
                    Direção
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
                    Espaço, geometria e contraste para uma linguagem mais precisa.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
