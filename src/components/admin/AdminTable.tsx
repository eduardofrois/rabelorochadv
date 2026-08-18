import Link from "next/link";

export function AdminTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white text-neutral-900">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h2 className="text-lg font-semibold">Posts</h2>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-50 text-neutral-600">
          <tr>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Atualizado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-6" colSpan={3}>
              Nenhum post cadastrado ainda. <Link className="underline" href="/admin/posts/novo">Criar primeiro post</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
