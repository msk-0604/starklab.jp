import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { getProjectBySlug } from "@/lib/projects";
import { getServiceByLegacyAnchor } from "@/lib/services";
import { homeFaq, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "サービス｜KENBEI（現場管理）",
  description:
    "Stark Labのサービスは現場管理WebサービスKENBEIです。自社開発・運営。14日間無料体験あり。公式アプリ app.kenbei.jp。",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `サービス｜KENBEI｜${siteConfig.name}`,
    description:
      "Stark Labが自社開発・運営する現場管理WebサービスKENBEI。建設会社の現場監督・施工管理者向け。",
    url: `${siteConfig.url}/services`,
  },
};

const legacyAnchors = [
  { id: "system", label: "システム開発" },
  { id: "ai", label: "AI活用" },
  { id: "homepage", label: "ホームページ制作" },
  { id: "seo", label: "SEO対策" },
  { id: "meo", label: "MEO対策" },
  { id: "maintenance", label: "保守・運用" },
  { id: "kenbei", label: "KENBEI" },
  { id: "drawstock", label: "DrawStock" },
] as const;

function legacyHref(id: string): string {
  if (id === "kenbei" || id === "kensapo") return "/works/kenbei";
  if (id === "drawstock") return "/works/drawstock";
  if (id === "meo" || id === "maintenance") return "/services";
  const svc = getServiceByLegacyAnchor(id);
  return svc ? `/services/${svc.slug}` : "/services";
}

export default function ServicesPage() {
  const kenbei = getProjectBySlug("kenbei");
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "サービス", path: "/services" },
  ];
  const faqs = homeFaq.filter((item) =>
    /KENBEI|Stark Lab|スタークラボ|対応エリア/.test(item.question),
  );

  return (
    <>
      <PageViewTracker pageType="service" dedupeKey="services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(faqs)),
        }}
      />
      <main className="flex-1">
        <section className="border-b border-border bg-surface pt-28 sm:pt-32">
          <div className="mx-auto max-w-3xl px-5 pb-14 text-center sm:px-8 sm:pb-16">
            <Breadcrumb
              className="flex justify-center"
              items={[
                { label: "ホーム", href: "/" },
                { label: "サービス" },
              ]}
            />
            <p className="mt-8 text-sm font-semibold tracking-wide text-accent">
              Service
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              KENBEI
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Stark Labが提供するサービスは、自社開発・運営の現場管理Webサービス
              KENBEIです。
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <ScrollReveal className="flex flex-col items-center text-center">
            {kenbei?.brandLogo ? (
              <div className="relative h-28 w-28 sm:h-36 sm:w-36">
                <Image
                  src={kenbei.brandLogo}
                  alt="KENBEIのロゴ"
                  fill
                  sizes="(max-width: 640px) 112px, 144px"
                  className="object-contain drop-shadow-[0_8px_24px_rgba(15,23,42,0.14)]"
                  priority
                />
              </div>
            ) : null}
            <p className="mt-8 text-sm font-semibold tracking-wide text-accent">
              自社開発サービス
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
              KENBEI（ケンベイ）
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {kenbei?.description}
            </p>
          </ScrollReveal>

          {kenbei?.pricing ? (
            <ScrollReveal delay={1} className="mt-14">
              <h3 className="text-center font-display text-xl font-bold text-foreground">
                {kenbei.pricing.heading ?? "料金"}
              </h3>
              <p className="mt-3 text-center text-sm text-muted">
                {kenbei.pricing.note}
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                {kenbei.pricing.plans.map((plan) => (
                  <li
                    key={plan.name}
                    className="rounded-[var(--radius-card)] border border-border bg-white px-5 py-5 text-center shadow-[var(--shadow-card)]"
                  >
                    <p className="text-sm font-semibold tracking-wide text-accent">
                      {plan.name}
                    </p>
                    <p className="mt-2 font-display text-lg font-bold text-foreground">
                      {plan.price}
                    </p>
                    {plan.detail ? (
                      <p className="mt-2 text-xs text-muted">{plan.detail}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ) : null}

          <ScrollReveal delay={2} className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button href="https://app.kenbei.jp" className="w-full sm:w-auto">
              KENBEIの詳細を見る
            </Button>
            <Button
              href="https://app.kenbei.jp/signup"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              14日間無料で試す
            </Button>
            <Button href="/works/kenbei" variant="secondary" className="w-full sm:w-auto">
              紹介ページ
            </Button>
          </ScrollReveal>

          <div className="mt-8 text-center">
            <Link href="/#contact" className="text-sm font-semibold text-accent hover:underline">
              お問い合わせはこちら
            </Link>
          </div>
        </section>

        {faqs.length > 0 ? (
          <section className="border-t border-border bg-surface py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-5 sm:px-8">
              <h2 className="text-center font-display text-2xl font-bold">よくある質問</h2>
              <dl className="mt-8 space-y-6">
                {faqs.map((f) => (
                  <div key={f.question}>
                    <dt className="font-semibold">{f.question}</dt>
                    <dd className="mt-2 text-sm text-muted">{f.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ) : null}

        {/* 旧URL互換（目立たせない） */}
        <section className="border-t border-border py-10">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <p className="text-center text-xs text-muted">
              以前のサービス案内からのリンク
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {legacyAnchors.map((a) => (
                <li key={a.id}>
                  <Link
                    href={legacyHref(a.id)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted hover:border-accent hover:text-accent"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
