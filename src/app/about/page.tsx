import type { Metadata } from "next";
import Link from "next/link";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { Button } from "@/components/Button";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, personJsonLd } from "@/lib/seo";
import { siteConfig, homeFaq } from "@/lib/site";

export const metadata: Metadata = {
  title: "会社概要",
  description: `${siteConfig.name}（${siteConfig.nameJa}）の会社概要。Web・AI・業務システム・データ活用を統合するDX/AI開発パートナー。運営者情報・対応エリア。`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `会社概要｜${siteConfig.name}`,
    description: siteConfig.entityStatement,
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "会社概要", path: "/about" },
  ];

  return (
    <>
      <PageViewTracker pageType="other" dedupeKey="about" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaq)) }}
      />
      <main className="flex-1">
        <section className="border-b border-border bg-surface pt-28 sm:pt-32">
          <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
            <Breadcrumb items={[{ label: "ホーム", href: "/" }, { label: "会社概要" }]} />
            <h1 className="mt-6 font-display text-3xl font-bold sm:text-5xl">会社概要</h1>
            <p className="mt-4 max-w-3xl text-muted">{siteConfig.entityStatement}</p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="font-display text-2xl font-bold">Stark Labとは</h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">{siteConfig.description}</p>

          <h2 className="mt-12 font-display text-2xl font-bold">運営者</h2>
          <p className="mt-4 text-muted">
            代表：{siteConfig.owner}
            <br />
            お問い合わせ：{siteConfig.email}
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">対応エリア</h2>
          <p className="mt-4 text-muted">{siteConfig.coverageNote}</p>
          <Link href="/areas" className="mt-2 inline-block text-sm text-accent hover:underline">
            対応エリアの詳細
          </Link>

          <h2 className="mt-12 font-display text-2xl font-bold">関連ページ</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            <li><Link href="/services" className="text-accent hover:underline">サービス</Link></li>
            <li><Link href="/industries" className="text-accent hover:underline">業種別</Link></li>
            <li><Link href="/works" className="text-accent hover:underline">実績</Link></li>
            <li><Link href="/media" className="text-accent hover:underline">Knowledge</Link></li>
          </ul>

          <div className="mt-12">
            <Button href="/#contact">相談する</Button>
          </div>
        </section>
      </main>
    </>
  );
}
