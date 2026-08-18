import { Button } from "@/components/ui/Button";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AreaPage({ params }: AreaPageProps) {
  const { slug } = await params;

  return (
    <section className="mx-auto grid min-h-[60vh] max-w-5xl gap-6 px-6 py-16 lg:px-12 lg:py-20">
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
        Área de atuação
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
        Conteúdo introdutório para a área <span className="font-medium text-[var(--color-brand)]">{slug}</span>,
        com foco em informação clara e próxima do que o visitante procura.
      </p>
      <div>
        <Button href="/contato">Fale com o escritório</Button>
      </div>
    </section>
  );
}
