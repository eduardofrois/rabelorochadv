import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/current-user";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <aside className="border-b border-neutral-800 px-6 py-4 text-sm font-medium uppercase tracking-[0.24em] text-neutral-400">
        Rabelo & Rocha Admin
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
