import { Button } from "@/components/ui/Button";

export default function AreasDeAtuacaoPage() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-5xl gap-6 px-6 py-16 lg:px-12 lg:py-20">
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
        Áreas de atuação
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
        Estruturamos a atuação por temas jurídicos para facilitar a leitura das
        necessidades mais comuns e orientar o próximo passo com objetividade.
      </p>
      <div>
        <Button href="/contato">Fale com o escritório</Button>
      </div>
    </section>
  );
}
