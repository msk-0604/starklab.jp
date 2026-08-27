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

export function faqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: [siteConfig.nameJa, "すたーくらぼ", "StarkLab"],
    description: siteConfig.seoDescription,
    url: siteConfig.url,
    email: siteConfig.email,
    logo: `${siteConfig.url}/brand/stark-lab-logo.png`,
    image: `${siteConfig.url}/brand/stark-lab-logo.png`,
    areaServed: [
      { "@type": "Country", name: "Japan" },
      ...getAllAreas().map((area) => ({
        "@type": "AdministrativeArea",
        name: area.name,
      })),
    ],
    knowsAbout: [
      ...offerings.map((item) => item.title),
      ...industries,
      siteConfig.nameJa,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      availableLanguage: "Japanese",
      areaServed: "JP",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: [siteConfig.nameJa, "すたーくらぼ"],
    url: siteConfig.url,
    inLanguage: "ja-JP",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      alternateName: siteConfig.nameJa,
    },
  };
}
