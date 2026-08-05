import type { Area } from "./areas";
import { getAllAreas } from "./areas";
import type { Project } from "./projects";
import { industries, offerings, siteConfig } from "./site";

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function worksListJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Works",
    description:
      "Stark Labのプロジェクト一覧。建設業向けホームページ制作・現場管理・図面管理などの事例です。",
    url: `${siteConfig.url}/works`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/works/${project.slug}`,
        name: project.title,
      })),
    },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.seo.description,
    url: `${siteConfig.url}/works/${project.slug}`,
    image: `${siteConfig.url}${project.coverImage}`,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: project.category,
    keywords: project.tags.join(", "),
  };
}

export function areaJsonLd(area: Area) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${area.name}の建設業向けホームページ制作・DX`,
    description: area.seo.description,
    url: `${siteConfig.url}/areas/${area.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: area.name,
    },
    serviceType: offerings.map((item) => item.title),
    audience: {
      "@type": "Audience",
      audienceType: industries.join("、"),
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    areaServed: [
      { "@type": "Country", name: "Japan" },
      ...getAllAreas().map((area) => ({
        "@type": "AdministrativeArea",
        name: area.name,
      })),
    ],
    knowsAbout: [...offerings.map((item) => item.title), ...industries],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      availableLanguage: "Japanese",
      areaServed: "JP",
    },
  };
}
