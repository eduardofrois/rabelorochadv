import Link from "next/link";

const footerLinks = [
  { href: "/escritorio", label: "Escritório" },
  { href: "/areas-de-atuacao", label: "Áreas" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
  { href: "/politica-de-privacidade", label: "Privacidade" },
  { href: "/termos-de-uso", label: "Termos" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-[var(--color-brand)] text-[var(--color-paper)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.3fr_1fr_0.9fr] lg:px-12">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/70">
            Rabelo & Rocha Advogados
          </p>
          <p className="max-w-xl text-base leading-7 text-white/80">
            Atuação institucional com precisão técnica, proximidade no atendimento e
            leitura contemporânea de risco.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            Navegação
          </p>
          <ul className="mt-5 grid gap-3 text-sm text-white/80">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
            Contato
          </p>
          <p className="text-sm leading-7 text-white/80">
            Canal institucional para demandas consultivas, estratégicas e preventivas.
          </p>
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand)]"
            href="/contato"
          >
            Fale conosco
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-xs uppercase tracking-[0.28em] text-white/60 lg:px-12">
        © {year} Rabelo & Rocha Advogados.
      </div>
    </footer>
  );
}
