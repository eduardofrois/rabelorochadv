import { PostForm } from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Novo post</h1>
      <PostForm />
    </section>
  );
}
