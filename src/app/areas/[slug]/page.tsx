import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AreaPageContent } from "@/components/areas/AreaPageContent";
import {
  getAllAreaSlugs,
  getAreaBySlug,
  getRelatedAreas,
} from "@/lib/areas";
import { areaJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    return { title: "対応エリアが見つかりません" };
  }

  return {
    title: area.seo.title,
    description: area.seo.description,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: {
      type: "website",
      locale: "ja_JP",
      url: `${siteConfig.url}/areas/${area.slug}`,
      siteName: siteConfig.name,
      title: area.seo.title,
      description: area.seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: area.seo.title,
      description: area.seo.description,
    },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);

  if (!area) {
    notFound();
  }

  const related = getRelatedAreas(area);
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "対応エリア", path: "/areas" },
    { name: area.name, path: `/areas/${area.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(areaJsonLd(area)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <main className="flex-1">
        <AreaPageContent area={area} related={related} />
      </main>
    </>
  );
}
