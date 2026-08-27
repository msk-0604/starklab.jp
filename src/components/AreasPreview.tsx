import Link from "next/link";
import { getAllAreas } from "@/lib/areas";
import { siteConfig } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function AreasPreview() {
  const areas = getAllAreas();

  return (
    <section id="areas" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Areas
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {siteConfig.coverage}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            オンラインで全国の企業・店舗様をご支援しています。地域別の情報はこちらからご覧ください。
          </p>
        </ScrollReveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map((area, index) => (
            <ScrollReveal
              key={area.slug}
              as="li"
              delay={(Math.min((index % 4) + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}
            >
              <Link
                href={`/areas/${area.slug}`}
                className="flex items-center justify-between rounded-[1.25rem] border border-border bg-surface px-5 py-4 text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[var(--shadow-card)]"
              >
                <span>
                  <span className="block text-xs font-semibold text-accent">
                    {area.region}
                  </span>
                  <span className="mt-1 block font-display text-lg font-semibold tracking-tight">
                    {area.name}
                  </span>
                </span>
                <span className="text-accent" aria-hidden="true">
                  →
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal className="mt-10 text-center">
          <Link
            href="/areas"
            className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            対応エリア一覧を見る →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
