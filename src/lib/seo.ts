import type { Metadata } from "next";
import seo from "@/content/seo.json";

export const SITE_NAME = seo.site.name;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? seo.site.url;
export const SITE_DESCRIPTION = seo.routes["/"].description;

export type RouteKey = keyof typeof seo.routes;

export function getPageMetadata(routeKey: RouteKey): Metadata {
  const entry = seo.routes[routeKey];

  if (!entry?.title || !entry?.description) {
    throw new Error(`seo.json is missing an entry for "${String(routeKey)}"`);
  }

  const path = routeKey === "/" ? "" : routeKey;
  const canonical = `${SITE_URL}${path}`;

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: seo.site.locale,
      type: "website",
      images: [
        {
          url: `${SITE_URL}${seo.site.defaultOgImage}`,
          alt: entry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: seo.site.twitterSite,
      title: entry.title,
      description: entry.description,
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seo.site.organization.name,
    url: seo.site.organization.url,
    logo: seo.site.organization.logo,
    sameAs: seo.site.organization.sameAs,
  };
}

