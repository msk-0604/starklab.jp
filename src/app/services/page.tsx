import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { offerings, siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "サービス｜Web制作・システム開発・AI",
  description:
    "ホームページ制作、業務システム、AI活用、SEO・運用まで。Stark Labのサービス一覧。日本全国どこでもオンライン対応。",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "サービス", path: "/services" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
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
            <h1 className="mt-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              サービス
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Web・システム・AIを、現場で使える形にします。{siteConfig.coverageNote}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <ul className="grid gap-8 sm:grid-cols-2">
            {offerings.map((item) => (
              <li key={item.id} id={item.id} className="border-t border-border pt-6">
                <h2 className="font-display text-xl font-bold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-16 text-center">
            <Button href="/#contact" className="min-w-[200px]">
              無料で相談する
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
