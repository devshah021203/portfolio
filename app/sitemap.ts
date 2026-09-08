import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { builds } from "@/data/builds";
import { brandOrder } from "@/data/designs";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/designs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...brandOrder.map((k) => ({ url: `${siteUrl}/designs/${k}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    { url: `${siteUrl}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...projects.map((p) => ({ url: `${siteUrl}/work/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...builds.map((b) => ({ url: `${siteUrl}/work/${b.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...articles.map((a) => ({ url: `${siteUrl}/insights/${a.slug}`, lastModified: new Date(a.modifiedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
