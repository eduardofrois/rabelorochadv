export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Editar post</h1>
      <p className="text-neutral-400">ID: {id}</p>
      <p>Interface mínima pronta para próxima etapa do fluxo administrativo.</p>
    </section>
  );
}
