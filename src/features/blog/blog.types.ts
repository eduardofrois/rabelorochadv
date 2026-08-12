export const postStatuses = ["DRAFT", "PUBLISHED", "SCHEDULED", "ARCHIVED"] as const;

export type PostStatus = (typeof postStatuses)[number];

export function isPublicPostStatus(status: PostStatus): boolean {
  return status === "PUBLISHED";
}
