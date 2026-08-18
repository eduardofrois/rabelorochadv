const allowedImageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export function isAllowedImageMimeType(mimeType: string): boolean {
  return allowedImageMimeTypes.has(mimeType);
}
