import { describe, expect, it } from "vitest";
import { isPublicPostStatus } from "@/features/blog/blog.types";

describe("blog status visibility", () => {
  it("only exposes published posts publicly", () => {
    expect(isPublicPostStatus("PUBLISHED")).toBe(true);
    expect(isPublicPostStatus("DRAFT")).toBe(false);
    expect(isPublicPostStatus("SCHEDULED")).toBe(false);
    expect(isPublicPostStatus("ARCHIVED")).toBe(false);
  });
});
