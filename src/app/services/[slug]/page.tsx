import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { ContentLandingPage } from "@/components/pages/ContentLandingPage";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/services";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "サービスが見つかりません" };
  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.seo.title}｜${siteConfig.name}`,
      description: service.seo.description,
      url: `${siteConfig.url}/services/${slug}`,
    },
  };
}

function ctaHref(topic: string) {
  return `/?type=${topic}&utm_source=site&utm_medium=cta&utm_campaign=service#contact`;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "サービス", path: "/services" },
    { name: service.shortTitle, path: `/services/${slug}` },
  ];

  const relatedLinks = [
    ...service.relatedServiceSlugs
      .filter((s) => s !== slug)
      .map((s) => {
        const rel = getServiceBySlug(s);
        return rel ? { label: rel.shortTitle, href: `/services/${s}` } : null;
      })
      .filter(Boolean) as { label: string; href: string }[],
    ...service.relatedIndustrySlugs.map((s) => ({
      label: `${s === "construction" ? "建設業" : s === "manufacturing" ? "製造業" : s}DX`,
      href: `/industries/${s}`,
    })),
    ...(service.relatedWorkSlugs ?? []).map((w) => ({
      label: "制作実績",
      href: `/works/${w}`,
    })),
  ];

  return (
    <>
      <PageViewTracker pageType="service" dedupeKey={`service-${slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(service)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(service.faqs)) }}
      />
      <ContentLandingPage
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "サービス", href: "/services" },
          { label: service.shortTitle },
        ]}
        badge="Service"
        title={service.title}
        summary={service.summary}
        whatIs={service.whatIs}
        problems={service.problems}
        whoFor={service.whoFor}
        capabilities={service.capabilities}
        useCases={service.examples}
        howWeHelp={service.howWeHelp}
        process={service.process}
        pricingNote={service.pricingNote}
        faqs={service.faqs}
        ctaLabel={service.ctaLabel}
        ctaHref={ctaHref(service.contactTopic)}
        relatedLinks={relatedLinks}
      />
    </>
  );
}
