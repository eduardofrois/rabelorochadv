import { describe, expect, it } from "vitest";
import { createMemoryRateLimiter } from "@/lib/security/rate-limit";
import { createCsrfToken, verifyCsrfToken } from "@/lib/security/csrf";

describe("security helpers", () => {
  it("blocks after the configured number of attempts", () => {
    const limiter = createMemoryRateLimiter({ limit: 2, windowMs: 60_000 });
    expect(limiter.check("contact:127.0.0.1").allowed).toBe(true);
    expect(limiter.check("contact:127.0.0.1").allowed).toBe(true);
    expect(limiter.check("contact:127.0.0.1").allowed).toBe(false);
  });

  it("verifies matching CSRF tokens and rejects mismatches", () => {
    const token = createCsrfToken();
    expect(verifyCsrfToken(token, token)).toBe(true);
    expect(verifyCsrfToken(token, "different-token")).toBe(false);
  });
});
