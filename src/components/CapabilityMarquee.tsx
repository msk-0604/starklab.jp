"use client";

const ITEMS = [
  "System Design",
  "AI Integration",
  "Web Architecture",
  "SEO Engineering",
  "Cloud Ops",
  "Product UI",
  "Data Pipeline",
  "API Design",
  "Automation",
  "Performance",
] as const;

/** Endless capability strip — CSS-only motion, no layout thrash. */
export function CapabilityMarquee() {
  const sequence = [...ITEMS, ...ITEMS];

  return (
    <section
      aria-label="技術領域"
      className="relative overflow-hidden border-y border-border bg-foreground py-3.5 sm:py-4"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-foreground to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-foreground to-transparent sm:w-20" />
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap will-change-transform">
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-10 text-[13px] font-medium tracking-[0.14em] text-white/75 uppercase sm:text-sm"
          >
            {item}
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}
