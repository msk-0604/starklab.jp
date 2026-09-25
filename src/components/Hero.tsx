import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

/** SIIG型ヒーロー：ブランド名を主役に、短い一文と導線のみ */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface via-white to-white pt-16 sm:pt-[4.25rem]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(37,99,235,0.10),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-[72vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="text-sm font-medium tracking-wide text-accent">
          {siteConfig.nameJa}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          {siteConfig.tagline}
        </p>
        <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button href="/#project" className="w-full sm:w-auto">
            KENBEIを見る
          </Button>
          <Button href="/#contact" variant="secondary" className="w-full sm:w-auto">
            お問い合わせ
          </Button>
        </div>
      </div>
    </section>
  );
}
