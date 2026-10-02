import type { MetadataRoute } from "next";
import { getAllAreas } from "@/lib/areas";
import { getAllIndustrySlugs } from "@/lib/industries-content";
import { getAllProjects } from "@/lib/projects";
import { getAllServiceSlugs } from "@/lib/services";
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

  const serviceEntries = getAllServiceSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const industryEntries = getAllIndustrySlugs().map((slug) => ({
    url: `${base}/industries/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${base}/services`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...serviceEntries,
    {
      url: `${base}/industries`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.88,
    },
    ...industryEntries,
    {
      url: `${base}/works`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...projectEntries,
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
