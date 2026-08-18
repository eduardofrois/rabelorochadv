import { describe, expect, it } from "vitest";
import { contactSchema } from "@/features/leads/leads.schemas";

describe("contact validation", () => {
  it("accepts valid leads and rejects invalid email", () => {
    expect(
      contactSchema.safeParse({
        name: "Cliente",
        email: "cliente@email.com",
        subject: "Contato",
        message: "Mensagem com detalhes suficientes.",
        sourcePage: "/contato",
      }).success,
    ).toBe(true);

    expect(
      contactSchema.safeParse({
        name: "Cliente",
        email: "x",
        subject: "Contato",
        message: "Mensagem com detalhes suficientes.",
        sourcePage: "/contato",
      }).success,
    ).toBe(false);
  });
});
