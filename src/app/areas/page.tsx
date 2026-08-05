import type { Metadata } from "next";
import Link from "next/link";
import { getAllAreas } from "@/lib/areas";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Button } from "@/components/Button";

const title = "対応エリア｜全国対応";
const description = `${siteConfig.name}は${siteConfig.coverage}。滋賀・京都・大阪・兵庫・奈良・愛知・東京など、地域別の建設業向けホームページ制作・DX情報をご覧ください。`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/areas" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: `${siteConfig.url}/areas`,
    siteName: siteConfig.name,
    title: `${title}｜${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title}｜${siteConfig.name}`,
    description,
  },
};

export default function AreasIndexPage() {
  const areas = getAllAreas();
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "対応エリア", path: "/areas" },
  ];

  const byRegion = areas.reduce<Record<string, typeof areas>>((acc, area) => {
    acc[area.region] = acc[area.region] ?? [];
    acc[area.region].push(area);
    return acc;
  }, {});

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <main className="flex-1">
        <div className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
            <Breadcrumb
              className="mb-8"
              items={[
                { label: "ホーム", href: "/" },
                { label: "対応エリア" },
              ]}
            />
            <ScrollReveal>
              <p className="text-sm font-semibold tracking-wide text-accent">
                Areas
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                {siteConfig.coverage}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {siteConfig.coverageNote}
                地域別ページから、お近くの建設会社様向けの情報をご確認ください。
              </p>
            </ScrollReveal>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          {Object.entries(byRegion).map(([region, regionAreas]) => (
            <section key={region} className="mb-14 last:mb-0">
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                {region}
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {regionAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/areas/${area.slug}`}
                      className="block rounded-[var(--radius-card)] border border-border bg-white p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                    >
                      <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                        {area.name}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                        {area.lead}
                      </p>
                      <span className="mt-4 inline-block text-sm font-semibold text-accent">
                        詳しく見る →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="mt-16 rounded-[var(--radius-card)] border border-border bg-surface px-6 py-10 text-center sm:px-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              掲載のない地域もご相談ください
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted sm:text-base">
              {siteConfig.coverage}のため、上記以外の都道府県でもオンラインでご支援できます。
            </p>
            <div className="mt-8">
              <Button href="/#contact" className="min-w-[180px]">
                相談する
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
