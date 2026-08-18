import { randomBytes, timingSafeEqual } from "node:crypto";

export function createCsrfToken(): string {
  return randomBytes(32).toString("base64url");
}

export function verifyCsrfToken(
  expectedToken: string | null | undefined,
  submittedToken: string | null | undefined,
): boolean {
  if (!expectedToken || !submittedToken) {
    return false;
  }

  const expected = Buffer.from(expectedToken);
  const submitted = Buffer.from(submittedToken);

  if (expected.length !== submitted.length) {
    return false;
  }

  return timingSafeEqual(expected, submitted);
}
