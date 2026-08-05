import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-16 sm:pt-[4.25rem]">
      {/* Full-bleed construction photo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-construction.jpg"
          alt="建設現場の様子"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/55 sm:via-white/88 sm:to-white/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/30"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="max-w-2xl animate-hero-1">
          <Image
            src="/brand/stark-lab-logo-mark.png"
            alt={siteConfig.name}
            width={629}
            height={450}
            priority
            className="h-12 w-auto sm:h-14"
          />

          <p className="mt-8 inline-flex items-center rounded-full border border-accent/20 bg-white/80 px-4 py-1.5 text-sm font-semibold text-accent backdrop-blur-sm">
            {siteConfig.coverage}
          </p>

          <h1 className="mt-5 font-display text-[1.85rem] font-bold leading-[1.25] tracking-tight text-foreground sm:text-4xl sm:leading-[1.2] lg:text-[2.65rem]">
            {siteConfig.tagline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" className="min-w-[200px]">
              相談する
            </Button>
            <Button href="/#services" variant="secondary" className="min-w-[180px]">
              サービスを見る
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">{siteConfig.responseNote}</p>
        </div>
      </div>
    </section>
  );
}
