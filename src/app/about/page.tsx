import type { Metadata } from "next";
import Link from "next/link";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { Button } from "@/components/Button";
import { breadcrumbJsonLd, faqJsonLd, organizationJsonLd, personJsonLd } from "@/lib/seo";
import { siteConfig, homeFaq } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `スタークラボ（Stark Lab）とは｜会社概要｜${siteConfig.name}`,
  },
  description: `${siteConfig.name}（${siteConfig.nameJa}／すたーくらぼ）の会社概要。Web・AI・業務システム・データ活用を統合するDX/AI開発パートナー。運営者・対応エリア・公式サイト情報。`,
  keywords: [
    "スタークラボ",
    "Stark Lab",
    "すたーくらぼ",
    "StarkLab",
    "会社概要",
    "DX",
    "滋賀",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `スタークラボ（Stark Lab）とは｜会社概要`,
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
            <h1 className="mt-6 font-display text-3xl font-bold sm:text-5xl">
              スタークラボ（Stark Lab）とは
            </h1>
            <p className="mt-4 max-w-3xl text-muted">{siteConfig.entityStatement}</p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <h2 className="font-display text-2xl font-bold">ブランド名・読み方</h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">
            正式名称は <strong className="text-foreground">Stark Lab</strong>、日本語表記は
            <strong className="text-foreground">スタークラボ</strong>、読みは
            <strong className="text-foreground">すたーくらぼ</strong> です。
            いずれも同じ会社を指します。公式サイトは{" "}
            <a href={siteConfig.url} className="text-accent hover:underline">
              {siteConfig.url.replace(/^https?:\/\//, "")}
            </a>
            です。
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">事業内容</h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">{siteConfig.description}</p>

          <h2 className="mt-12 font-display text-2xl font-bold">運営者</h2>
          <p className="mt-4 text-muted leading-relaxed">
            販売事業者：{siteConfig.name}（{siteConfig.nameJa}）
            <br />
            運営責任者：{siteConfig.owner}
            <br />
            お問い合わせ：
            <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
              {siteConfig.email}
            </a>
            <br />
            拠点：{siteConfig.location}（打合せ・納品はオンライン完結）
          </p>
          <p className="mt-3 text-sm text-muted">
            特定商取引法に基づく表記は
            <Link href="/tokushoho" className="text-accent hover:underline">
              こちら
            </Link>
            をご確認ください。
          </p>

          <h2 className="mt-12 font-display text-2xl font-bold">自社プロダクト</h2>
          <p className="mt-4 max-w-3xl text-muted leading-relaxed">
            Stark Labは現場管理Webサービス
            <strong className="text-foreground">KENBEI（ケンベイ）</strong>
            を自社開発・運営しています。建設会社の現場監督・施工管理者向けに、現場写真・タスク・進捗・日報PDFを一元管理するサービスです。顧客への導入事例ではなく、自社サービスです。
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/works/kenbei" variant="secondary" className="w-full sm:w-auto">
              KENBEIの紹介を見る
            </Button>
            <Button
              href="https://app.kenbei.jp"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              KENBEIの詳細を見る
            </Button>
            <Button href="https://app.kenbei.jp/signup" className="w-full sm:w-auto">
              14日間無料で試す
            </Button>
          </div>

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
