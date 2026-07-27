import { processSteps } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function Process() {
  return (
    <section id="process" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Process
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            制作の流れ
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            お問い合わせから公開・運用まで、シンプルな5ステップです。
          </p>
        </ScrollReveal>

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-[1.65rem] top-4 bottom-4 w-px bg-border lg:left-8 lg:right-8 lg:top-8 lg:bottom-auto lg:h-px lg:w-auto"
            aria-hidden="true"
          />

          <ol className="grid gap-6 lg:grid-cols-5 lg:gap-4">
            {processSteps.map((item, index) => (
              <ScrollReveal
                key={item.step}
                as="li"
                delay={(Math.min(index, 4) || 0) as 0 | 1 | 2 | 3 | 4}
                className="relative"
              >
                <div className="flex gap-4 lg:flex-col lg:items-center lg:text-center">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-accent text-lg font-bold text-white shadow-[var(--shadow-cta)] lg:mx-auto">
                    {item.step}
                  </div>
                  <div className="pt-2 lg:pt-5">
                    <p className="text-xs font-semibold tracking-wide text-accent">
                      STEP{item.step}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
