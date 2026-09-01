import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const articlePages = articles.map((article) => ({
    url: `${siteUrl}/insights/${article.slug}`,
    lastModified: new Date(article.modifiedAt),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const projectPages = projects.map((project) => ({
    url: `${siteUrl}/work/${project.slug}`,
    lastModified: new Date("2026-07-15"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/insights`,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/dwello`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/beamfall`,
      lastModified: new Date("2026-08-31"),
      changeFrequency: "monthly",
      priority: 0.92,
    },
    ...articlePages,
    ...projectPages,
  ];
}
