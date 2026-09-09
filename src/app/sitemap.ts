import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import seo from "@/content/seo.json";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.entries(seo.routes);

  return routes.map(([path, data]) => {
    const routePath = path === "/" ? "" : path;
    return {
      url: `${SITE_URL}${routePath}`,
      lastModified: new Date(),
      changeFrequency: (data.changeFrequency || "weekly") as ChangeFrequency,
      priority: data.priority ?? 0.7,
    };
  });
}
