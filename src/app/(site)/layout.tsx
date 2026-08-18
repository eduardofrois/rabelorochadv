import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "Rabelo & Rocha Advogados",
  description:
    "Escritório de advocacia com atuação institucional, inovação jurídica e atendimento estratégico.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full bg-[var(--color-paper)] text-[var(--color-ink)]">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
