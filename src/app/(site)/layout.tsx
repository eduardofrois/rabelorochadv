import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "Rabelo & Rocha Advogados",
  description:
    "Escritório de advocacia com atuação institucional, inovação jurídica e atendimento estratégico.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
