import { describe, expect, it } from "vitest";
import { postSlugSchema } from "@/features/blog/blog.schemas";

describe("blog public validation", () => {
  it("accepts lowercase SEO slugs and rejects unsafe slugs", () => {
    expect(postSlugSchema.safeParse("direito-aereo").success).toBe(true);
    expect(postSlugSchema.safeParse("../admin").success).toBe(false);
  });
});
