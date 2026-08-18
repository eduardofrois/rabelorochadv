export const siteConfig = {
  name: "Rabelo & Rocha Advogados",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://rabelorochadv.com.br",
  description:
    "Escritório de advocacia com atuação estratégica, inovação e proximidade.",
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
  };
}
