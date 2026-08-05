import Link from "next/link";
import type { Area } from "@/lib/areas";
import { industries, offerings, siteConfig } from "@/lib/site";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumb } from "@/components/works/Breadcrumb";

type AreaPageContentProps = {
  area: Area;
  related: Area[];
};

export function AreaPageContent({ area, related }: AreaPageContentProps) {
  return (
    <div className="pb-20 sm:pb-28">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
          <Breadcrumb
            className="mb-8"
            items={[
              { label: "ホーム", href: "/" },
              { label: "対応エリア", href: "/areas" },
              { label: area.name },
            ]}
          />

          <ScrollReveal>
            <p className="inline-flex items-center rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-sm font-semibold text-accent">
              {siteConfig.coverage} ／ {area.region}
            </p>
            <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {area.name}の建設業向け
              <br className="hidden sm:block" />
              ホームページ制作・DX
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {area.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#contact">相談する</Button>
              <Button href="/#services" variant="secondary">
                サービス一覧
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <section className="py-12 sm:py-16">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-accent">
              Local
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {area.name}の建設会社様へ
            </h2>
            <ul className="mt-8 space-y-4">
              {area.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[15px] leading-relaxed text-muted"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {area.cities && area.cities.length > 0 ? (
              <p className="mt-8 text-sm text-muted">
                主なエリア例：{area.cities.join("、")} など
              </p>
            ) : null}
          </ScrollReveal>
        </section>

        <section className="border-y border-border py-12 sm:py-16">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-accent">
              Services
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {area.name}でもワンストップ対応
            </h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {offerings.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-border bg-white px-4 py-4 shadow-[var(--shadow-card)]"
                >
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>

        <section className="py-12 sm:py-16">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-accent">
              Industries
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              対象業種
            </h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {industries.map((industry) => (
                <li
                  key={industry}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {industry}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>

        <ScrollReveal className="rounded-[var(--radius-card)] bg-foreground px-6 py-10 text-center sm:px-10 sm:py-14">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {area.name}の建設会社様、まずはご相談ください
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            {siteConfig.coverage}。オンラインでスムーズに進められます。
          </p>
          <div className="mt-8">
            <Button href="/#contact" className="min-w-[200px]">
              お問い合わせ
            </Button>
          </div>
        </ScrollReveal>

        {related.length > 0 ? (
          <section className="mt-16 sm:mt-20">
            <ScrollReveal>
              <h2 className="font-display text-xl font-bold tracking-tight text-foreground">
                その他の対応エリア
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/areas/${item.slug}`}
                      className="inline-flex rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30 hover:text-accent"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/areas"
                    className="inline-flex rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-accent"
                  >
                    一覧へ
                  </Link>
                </li>
              </ul>
            </ScrollReveal>
          </section>
        ) : null}
      </div>
    </div>
  );
}
