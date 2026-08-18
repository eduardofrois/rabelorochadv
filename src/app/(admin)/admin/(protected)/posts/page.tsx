import { AdminTable } from "@/components/admin/AdminTable";

export default function AdminPostsPage() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-sm text-neutral-400">Gerencie os conteúdos do blog jurídico.</p>
        </div>
      </div>
      <AdminTable />
    </section>
  );
}
