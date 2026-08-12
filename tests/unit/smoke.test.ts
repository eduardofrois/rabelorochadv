import { describe, expect, it } from "vitest";

describe("project foundation", () => {
  it("identifies the application name", () => {
    expect(process.env.NEXT_PUBLIC_SITE_NAME).toBe("Rabelo & Rocha Advogados");
  });
});
