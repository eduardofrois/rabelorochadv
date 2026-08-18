import Link from "next/link";

import { Button } from "@/components/ui/Button";

const navigation = [
  { href: "/escritorio", label: "Escritório" },
  { href: "/areas-de-atuacao", label: "Áreas" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
] as const;

export function Header() {
  return (
    <header className="border-b border-[var(--color-line)] bg-[rgba(229,229,229,0.9)] backdrop-blur supports-[backdrop-filter]:bg-[rgba(229,229,229,0.8)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:gap-5 lg:px-12">
        <div className="flex items-start justify-between gap-6 sm:items-center">
        <Link href="/" className="group inline-flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.42em] text-[var(--color-brand)] transition group-hover:translate-x-0.5">
            Rabelo & Rocha Advogados
          </span>
          <span className="mt-1 text-[0.68rem] uppercase tracking-[0.36em] text-[var(--color-muted)]">
            Direito, inovação e tecnologia
          </span>
        </Link>

          <div className="sm:hidden">
            <Button href="/contato" variant="secondary" className="px-4 py-2 text-xs">
              Fale com o escritório
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Navegação principal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="transition hover:text-[var(--color-ink)] focus-visible:text-[var(--color-ink)]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden sm:block">
            <Button href="/contato" variant="secondary">
              Fale com o escritório
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
