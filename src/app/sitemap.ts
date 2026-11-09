import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      "",
      "/articole",
      "/categorii",
      "/formulare",
      "/calculator-taxe",
      "/actualizari",
      "/despre",
      "/contact",
      "/politica-de-confidentialitate",
      "/politica-de-cookie-uri",
      "/termeni",
    ].map((path) => ({
      url: canonicalUrl(path || "/"),
      changeFrequency: "weekly" as const,
      priority: path ? 0.6 : 1,
    })),
    ...categories.map(({ slug }) => ({
      url: canonicalUrl("/categorii/" + slug),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...articles.map(({ slug, reviewedAt }) => ({
      url: canonicalUrl("/articol/" + slug),
      lastModified: reviewedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
