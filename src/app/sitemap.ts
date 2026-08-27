import type { MetadataRoute } from "next";
import { getAllAreas } from "@/lib/areas";
import { listPublishedSlugs } from "@/lib/media";
import { getAllProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const lastModified = new Date();

  const projectEntries = getAllProjects().map((project) => ({
    url: `${base}/works/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const areaEntries = getAllAreas().map((area) => ({
    url: `${base}/areas/${area.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const mediaSlugs = await listPublishedSlugs();
  const mediaEntries = mediaSlugs.map((slug) => ({
    url: `${base}/media/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    },
    {
      url: `${base}/works`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...projectEntries,
    {
      url: `${base}/media`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...mediaEntries,
    {
      url: `${base}/areas`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    ...areaEntries,
    {
      url: `${base}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/tokushoho`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
