import { Button } from "@/components/ui/Button";

export default function ContatoPage() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-5xl gap-6 px-6 py-16 lg:px-12 lg:py-20">
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
        Contato
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
        Para demandas consultivas, estratégicas ou preventivas, entre em contato com
        o escritório e descreva brevemente a sua necessidade.
      </p>
      <div>
        <Button href="mailto:contato@rabelorochadv.com.br">Enviar mensagem</Button>
      </div>
    </section>
  );
}
