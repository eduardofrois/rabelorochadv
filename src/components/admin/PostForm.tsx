import { createPostAction } from "@/features/blog/post.actions";

export function PostForm() {
  return (
    <form
      action={async (formData) => {
        await createPostAction(formData);
      }}
      className="grid max-w-3xl gap-4"
    >
      <label>
        Título
        <input name="title" required className="w-full rounded border p-2 text-black" />
      </label>
      <label>
        Slug
        <input name="slug" required className="w-full rounded border p-2 text-black" />
      </label>
      <label>
        Resumo
        <textarea name="excerpt" required className="w-full rounded border p-2 text-black" />
      </label>
      <label>
        Conteúdo
        <textarea
          name="content"
          required
          rows={12}
          className="w-full rounded border p-2 text-black"
        />
      </label>
      <label>
        Status
        <select name="status" className="w-full rounded border p-2 text-black" defaultValue="DRAFT">
          <option value="DRAFT">Rascunho</option>
          <option value="PUBLISHED">Publicado</option>
          <option value="SCHEDULED">Agendado</option>
          <option value="ARCHIVED">Arquivado</option>
        </select>
      </label>
      <label>
        SEO title
        <input name="seoTitle" className="w-full rounded border p-2 text-black" />
      </label>
      <label>
        SEO description
        <textarea name="seoDescription" className="w-full rounded border p-2 text-black" />
      </label>
      <button className="rounded bg-[#164245] px-4 py-2 font-semibold text-white" type="submit">
        Salvar
      </button>
    </form>
  );
}
