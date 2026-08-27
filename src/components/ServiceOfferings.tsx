import { offerings } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function ServiceOfferings() {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">
            Services
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            システム・AI・Web
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            開発、制作、集客、運用まで。必要な範囲から一緒に進めます。
          </p>
        </ScrollReveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((item, index) => (
            <ScrollReveal
              key={item.id}
              as="li"
              delay={(Math.min((index % 4) + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}
              className="h-full"
            >
              <article className="flex h-full flex-col border-t border-border pt-5">
                <p className="text-xs font-semibold tracking-wide text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-[17px] font-semibold tracking-tight text-foreground">
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
    </section>
  );
}
