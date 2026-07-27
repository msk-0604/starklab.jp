import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 sm:pt-[4.25rem]">
      {/* Atmospheric full-bleed background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,113,227,0.14),transparent_55%),radial-gradient(ellipse_50%_40%_at_90%_20%,rgba(90,160,255,0.1),transparent_50%),linear-gradient(180deg,#ffffff_0%,#f5f5f7_100%)]" />
        <div className="animate-soft-pulse absolute -left-24 top-32 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="animate-soft-pulse absolute -right-16 top-48 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl [animation-delay:2s]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-2 lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="text-center lg:text-left">
          <p className="animate-hero-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {siteConfig.name}
          </p>

          <h1 className="animate-hero-2 mt-5 font-display text-[1.85rem] font-bold leading-[1.25] tracking-tight text-foreground sm:text-4xl sm:leading-[1.2] lg:text-[2.65rem]">
            {siteConfig.tagline}
          </h1>

          <p className="animate-hero-3 mx-auto mt-5 max-w-xl whitespace-pre-line text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {siteConfig.description}
          </p>

          <div className="animate-hero-4 mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <Button href="/#contact" className="min-w-[200px] text-base">
              無料相談はこちら
            </Button>
            <Button
              href="/#contact"
              variant="secondary"
              className="min-w-[160px] text-base"
            >
              お問い合わせ
            </Button>
          </div>
        </div>

        {/* Dominant visual: browser mockup */}
        <div className="animate-hero-4 relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="animate-float relative">
            <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_30px_80px_rgba(0,0,0,0.1)]">
              <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div
                  className="ml-2 h-5 flex-1 rounded-full bg-white"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-5 bg-gradient-to-b from-white to-surface p-6 sm:p-8">
                <div className="h-3 w-24 rounded-full bg-accent/20" />
                <div className="space-y-2">
                  <div className="h-4 w-4/5 max-w-[85%] rounded-full bg-foreground/10" />
                  <div className="h-4 w-3/5 max-w-[60%] rounded-full bg-foreground/10" />
                </div>
                <div className="h-28 rounded-2xl bg-gradient-to-br from-accent/15 via-sky-100 to-surface sm:h-36" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-xl bg-white shadow-[var(--shadow-card)]" />
                  <div className="h-16 rounded-xl bg-white shadow-[var(--shadow-card)]" />
                  <div className="h-16 rounded-xl bg-white shadow-[var(--shadow-card)]" />
                </div>
                <div className="flex justify-center pt-1">
                  <div className="h-9 w-32 rounded-full bg-accent shadow-[var(--shadow-cta)]" />
                </div>
              </div>
            </div>
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent-glow blur-2xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
