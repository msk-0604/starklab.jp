import type { Metadata } from "next";
import Link from "next/link";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { getAllServices, getServiceByLegacyAnchor } from "@/lib/services";
import { homeFaq, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "サービス｜Web・AI・System・Data",
  description:
    "Web Development、System Development、AI Automation、AI Agent、RAG、Data/Dashboard、SEO/AI Search、DX Consulting。8本柱のサービス一覧。",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `サービス｜${siteConfig.name}`,
    description: siteConfig.entityStatement,
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
  if (id === "meo") return "/services/web-development";
  if (id === "maintenance") return "/services/web-development";
  const svc = getServiceByLegacyAnchor(id);
  return svc ? `/services/${svc.slug}` : `/services#${id}`;
}

export default function ServicesPage() {
  const services = getAllServices();
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "サービス", path: "/services" },
  ];
  const projects = getAllProjects().filter((p) => p.slug !== "stark-lab");
  const serviceFaqs = homeFaq.filter((item) =>
    /相談|システム|Web|料金|Stark/.test(item.question),
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
          __html: JSON.stringify(faqJsonLd(serviceFaqs)),
        }}
      />
      <main className="flex-1">
        <section className="border-b border-border bg-surface pt-28 sm:pt-32">
          <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
            <Breadcrumb
              items={[
                { label: "ホーム", href: "/" },
                { label: "サービス" },
              ]}
            />
            <p className="mt-6 text-sm font-semibold tracking-wide text-accent">Services</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              8つの専門サービス
            </h1>
            <p className="mt-4 max-w-3xl text-muted">
              {siteConfig.entityStatement}
              技術領域ごとに専門ページで詳しく解説しています。
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <ul className="grid gap-6 sm:grid-cols-2">
            {services.map((svc) => (
              <ScrollReveal key={svc.slug}>
                <article
                  id={svc.legacyAnchor ?? undefined}
                  className="scroll-mt-28 rounded-[var(--radius-card)] border border-border p-6"
                >
                  <h2 className="font-display text-xl font-bold text-foreground">
                    <Link href={`/services/${svc.slug}`} className="hover:text-accent">
                      {svc.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-sm text-muted">{svc.summary}</p>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="mt-4 inline-block text-sm font-medium text-accent"
                  >
                    詳細ページへ →
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </ul>
        </section>

        {/* 旧アンカー互換 — 各セクションへ誘導 */}
        <section className="border-t border-border bg-surface py-12 sm:py-14">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="font-display text-lg font-bold text-foreground">従来のリンクから</h2>
            <p className="mt-2 text-sm text-muted">
              以前の /services#system などのリンクも、新しい専門ページへ誘導します。
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {legacyAnchors.map((a) => (
                <li key={a.id}>
                  <Link
                    href={legacyHref(a.id)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-accent"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="font-display text-2xl font-bold">関連実績</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/works/${p.slug}`} className="text-sm font-medium text-accent hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <h2 className="font-display text-2xl font-bold">よくある質問</h2>
            <dl className="mt-8 space-y-6">
              {serviceFaqs.map((f) => (
                <div key={f.question}>
                  <dt className="font-semibold">{f.question}</dt>
                  <dd className="mt-2 text-sm text-muted">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-16 text-center">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Button href="/#contact">無料で相談する</Button>
          </div>
        </section>
      </main>
    </>
  );
}
