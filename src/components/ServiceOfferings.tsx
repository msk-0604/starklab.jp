import Image from "next/image";
import { offerings } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function ServiceOfferings() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-accent">
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              サービス
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              制作・集客・運用・業務改善まで、必要な範囲から一緒に進めます。
            </p>
            <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-border shadow-[var(--shadow-card)]">
              <Image
                src="/images/hero-workdesk.jpg"
                alt="ホームページ制作・SEO支援"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {offerings.map((item, index) => (
              <ScrollReveal
                key={item.id}
                as="li"
                delay={(Math.min((index % 4) + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}
                className="h-full"
              >
                <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
                  <p className="text-xs font-semibold tracking-wide text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-[15px] font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
