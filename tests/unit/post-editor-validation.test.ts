import { describe, expect, it } from "vitest";
import { postEditorSchema } from "@/features/blog/blog.schemas";

describe("post editor validation", () => {
  it("requires safe slug and meaningful content", () => {
    const result = postEditorSchema.safeParse({
      title: "Guia de direito aéreo",
      slug: "guia-direito-aereo",
      excerpt: "Resumo objetivo sobre direitos do passageiro aéreo.",
      content:
        "Conteúdo completo com informações úteis para o leitor e CTA discreto para contato.",
      status: "DRAFT",
      seoTitle: "Guia de direito aéreo",
      seoDescription: "Entenda direitos do passageiro aéreo em situações comuns.",
    });

    expect(result.success).toBe(true);
  });
});
