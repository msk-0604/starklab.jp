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
            建設業に特化
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.coverage}
            。水道・設備・電気・建築など、建設業の業種に合わせてご提案します。
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
