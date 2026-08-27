import type { Metadata } from "next";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { WorksGrid, WorksPageHero } from "@/components/works/WorksGrid";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getAllProjects } from "@/lib/projects";
import { breadcrumbJsonLd, worksListJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const title = "Works";
const description =
  "Stark Labのプロジェクト一覧。Web制作、業務システム、AI活用の実績です。";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: `${siteConfig.url}/works`,
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

export default function WorksPage() {
  const projects = getAllProjects();
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "Works", path: "/works" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(worksListJsonLd(projects)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <main className="flex-1">
        <WorksPageHero />

        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
          <Breadcrumb
            items={[
              { label: "ホーム", href: "/" },
              { label: "Works" },
            ]}
          />
        </div>

        <section className="pb-20 sm:pb-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <WorksGrid projects={projects} />

            <ScrollReveal className="mt-20 rounded-[var(--radius-card)] border border-border bg-surface px-6 py-12 text-center sm:mt-28 sm:px-10 sm:py-16">
              <p className="text-sm font-semibold tracking-wide text-accent">
                Contact
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                ご相談はこちら
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                プロダクトやDXについて、お気軽にお問い合わせください。
              </p>
              <div className="mt-8">
                <Button href="/#contact" className="min-w-[160px]">
                お問い合わせ
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
}
