import type { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/db/client";

export type CreateMediaAssetInput = {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  altText: string;
  storagePath: string;
};

export function createMediaAsset(input: CreateMediaAssetInput, db: PrismaClient = prisma) {
  return db.mediaAsset.create({ data: input });
}

export function listMediaAssets(db: PrismaClient = prisma) {
  return db.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
  });
}
