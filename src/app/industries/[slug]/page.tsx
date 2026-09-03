import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { ContentLandingPage } from "@/components/pages/ContentLandingPage";
import { listPublishedPosts } from "@/lib/media";
import { getIndustryBySlug, getAllIndustrySlugs } from "@/lib/industries-content";
import { filterPostsByCategory } from "@/lib/knowledge";
import { getServiceBySlug } from "@/lib/services";
import { breadcrumbJsonLd, faqJsonLd, industryServiceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "ページが見つかりません" };
  return {
    title: industry.seo.title,
    description: industry.seo.description,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${industry.seo.title}｜${siteConfig.name}`,
      description: industry.seo.description,
      url: `${siteConfig.url}/industries/${slug}`,
    },
  };
}

function ctaHref(topic: string) {
  return `/?type=${topic}&utm_source=site&utm_medium=cta&utm_campaign=industry#contact`;
}

const industryCategoryMap: Record<string, string> = {
  construction: "construction",
  manufacturing: "manufacturing",
  "small-business": "dx",
  "real-estate": "web",
  "service-business": "seo",
};

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const posts = await listPublishedPosts(40);
  const catSlug = industryCategoryMap[slug] ?? "dx";
  const relatedMedia = filterPostsByCategory(posts, catSlug).slice(0, 4);

  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "業種別", path: "/industries" },
    { name: industry.name, path: `/industries/${slug}` },
  ];

  const relatedLinks = [
    ...industry.serviceSlugs.map((s) => {
      const svc = getServiceBySlug(s);
      return svc ? { label: svc.shortTitle, href: `/services/${s}` } : null;
    }).filter(Boolean) as { label: string; href: string }[],
    ...industry.workSlugs.map((w) => ({ label: "制作実績", href: `/works/${w}` })),
    ...relatedMedia.map((p) => ({ label: p.title, href: `/media/${p.slug}` })),
    { label: "Knowledge", href: `/media/category/${catSlug}` },
  ];

  return (
    <>
      <PageViewTracker pageType="other" dedupeKey={`industry-${slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industryServiceJsonLd(industry)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(industry.faqs)) }}
      />
      <ContentLandingPage
        breadcrumbs={[
          { label: "ホーム", href: "/" },
          { label: "業種別", href: "/industries" },
          { label: industry.name },
        ]}
        badge="Industry"
        title={`${industry.name}向けDX`}
        summary={industry.summary}
        whatIs={industry.whatIs}
        problems={industry.challenges}
        useCases={industry.useCases}
        implementationNotes={industry.implementationNotes}
        faqs={industry.faqs}
        ctaLabel={industry.ctaLabel}
        ctaHref={ctaHref(industry.contactTopic)}
        relatedLinks={relatedLinks}
      />
    </>
  );
}
