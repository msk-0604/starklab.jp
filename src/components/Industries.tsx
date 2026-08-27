import { industries, siteConfig } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function Industries() {
  return (
    <section id="industries" className="scroll-mt-24 bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Industries
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            業種を問いません
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.coverage}。IT、製造、店舗、士業など、業種を問わずご相談ください。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1}>
          <ul className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)]"
              >
                {industry}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
