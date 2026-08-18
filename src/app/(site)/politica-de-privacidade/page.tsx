import { Button } from "@/components/ui/Button";

export default function PoliticaDePrivacidadePage() {
  return (
    <section className="mx-auto grid min-h-[60vh] max-w-5xl gap-6 px-6 py-16 lg:px-12 lg:py-20">
      <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--color-ink)] sm:text-5xl">
        Política de privacidade
      </h1>
      <p className="max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
        Esta página apresenta, de forma objetiva, como tratamos os dados enviados
        pelos formulários e pelos canais institucionais do site.
      </p>
      <div>
        <Button href="/contato">Fale com o escritório</Button>
      </div>
    </section>
  );
}
