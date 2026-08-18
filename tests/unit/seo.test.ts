import { describe, expect, it } from "vitest";
import { organizationJsonLd, siteConfig } from "@/lib/seo/site-metadata";

describe("seo metadata", () => {
  it("defines canonical site identity", () => {
    expect(siteConfig.name).toBe("Rabelo & Rocha Advogados");
    expect(organizationJsonLd()["@type"]).toBe("LegalService");
  });
});
