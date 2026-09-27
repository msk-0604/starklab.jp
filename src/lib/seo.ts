import type { ServiceDefinition } from "./services";
import type { IndustryDefinition } from "./industries-content";
import { siteConfig } from "./site";

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
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

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.owner,
    jobTitle: "代表",
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function serviceJsonLd(service: ServiceDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "Japan" },
    serviceType: service.shortTitle,
  };
}

export function industryServiceJsonLd(industry: IndustryDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.name}向けDX`,
    description: industry.summary,
    url: `${siteConfig.url}/industries/${industry.slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: { "@type": "Country", name: "Japan" },
  };
}

export function organizationJsonLd() {
  const serviceNames = [
    "Web Development",
    "System Development",
    "AI Automation",
    "AI Agent Development",
    "RAG / Knowledge AI",
    "Data / Dashboard",
    "SEO / AI Search Growth",
    "DX Consulting",
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.name,
    alternateName: [...siteConfig.brandAliases],
    slogan: siteConfig.tagline,
    description: siteConfig.seoDescription,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    logo: `${siteConfig.url}/brand/stark-lab-logo.png`,
    image: `${siteConfig.url}/brand/stark-lab-logo.png`,
    founder: {
      "@type": "Person",
      name: siteConfig.owner,
      jobTitle: "代表",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "坂本6丁目15-28",
      addressLocality: "大津市",
      addressRegion: "滋賀県",
      addressCountry: "JP",
    },
    areaServed: { "@type": "Country", name: "Japan" },
    knowsAbout: [
      ...serviceNames,
      "Construction DX",
      "Manufacturing DX",
      "DX Consulting",
      "スタークラボ",
      "すたーくらぼ",
      "Stark Lab",
      "KENBEI",
      "DrawStock",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      availableLanguage: ["Japanese", "ja"],
      areaServed: "JP",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: [...siteConfig.brandAliases],
    url: siteConfig.url,
    inLanguage: "ja-JP",
    description: siteConfig.entityStatement,
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      alternateName: siteConfig.nameJa,
    },
  };
}

// Re-export project/area helpers — import from their modules in pages
export type { Project } from "./projects";
export type { Area } from "./areas";

import type { Project } from "./projects";
import type { Area } from "./areas";

export function worksListJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Works",
    description: "Stark Labの自社開発サービスと制作実績。Web、業務システム、AI活用の事例です。",
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
    ...(project.coverImage
      ? { image: `${siteConfig.url}${project.coverImage}` }
      : {}),
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
    name: `${area.name}のWeb・システム・AI開発`,
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
  };
}
