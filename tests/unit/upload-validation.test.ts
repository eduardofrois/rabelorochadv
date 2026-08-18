import { describe, expect, it } from "vitest";
import { isAllowedImageMimeType } from "@/features/media/media.schemas";

describe("media validation", () => {
  it("allows safe image types only", () => {
    expect(isAllowedImageMimeType("image/webp")).toBe(true);
    expect(isAllowedImageMimeType("image/jpeg")).toBe(true);
    expect(isAllowedImageMimeType("application/javascript")).toBe(false);
  });
});
