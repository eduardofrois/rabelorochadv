import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo/site-metadata";

const publicRoutes = [
  "/",
  "/escritorio",
  "/areas-de-atuacao",
  "/blog",
  "/contato",
  "/politica-de-privacidade",
  "/termos-de-uso",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
