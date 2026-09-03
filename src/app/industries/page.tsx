import type { Metadata } from "next";
import Link from "next/link";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { getAllIndustries } from "@/lib/industries-content";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "業種別ソリューション",
  description:
    "建設業・製造業・中小企業・不動産・店舗・サービス業向けのDXソリューション。課題・ユースケース・Stark Labのサービスを業種別に整理。",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: `業種別ソリューション｜${siteConfig.name}`,
    description: "業種ごとの課題と、Web・AI・System・Dataによる解決策。",
    url: `${siteConfig.url}/industries`,
  },
};

export default function IndustriesIndexPage() {
  const industries = getAllIndustries();
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "業種別", path: "/industries" },
  ];

  return (
    <>
      <PageViewTracker pageType="other" dedupeKey="industries" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <main className="flex-1">
        <section className="border-b border-border bg-surface pt-28 sm:pt-32">
          <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
            <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "業種別" }]} />
            <p className="mt-6 text-sm font-semibold tracking-wide text-accent">Industries</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              業種別ソリューション
            </h1>
            <p className="mt-4 max-w-2xl text-muted">
              業界の課題・ユースケース・利用できるサービスを整理。薄いコピーの量産ではなく、
              実装可能な範囲を明確にしたページです。
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <ul className="grid gap-6 sm:grid-cols-2">
            {industries.map((ind) => (
              <ScrollReveal key={ind.slug}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="block rounded-[var(--radius-card)] border border-border p-6 transition hover:border-accent/40"
                >
                  <h2 className="font-display text-xl font-bold text-foreground">{ind.name}</h2>
                  <p className="mt-3 text-sm text-muted">{ind.summary}</p>
                  <span className="mt-4 text-sm font-medium text-accent">詳しく見る →</span>
                </Link>
              </ScrollReveal>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Button href="/#contact">業種別の相談をする</Button>
          </div>
        </section>
      </main>
    </>
  );
}
