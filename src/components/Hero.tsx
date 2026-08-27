import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden pt-16 sm:pt-[4.25rem]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-system.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/40 sm:via-white/88 sm:to-white/25"
          aria-hidden="true"
        />
      </div>

      <div className="mx-auto flex min-h-[calc(78vh-4.25rem)] max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-xl animate-hero-1">
          <p className="text-sm font-medium text-muted">
            {siteConfig.nameJa} ／ 日本全国どこでも
          </p>
          <h1 className="mt-4 font-display text-[1.85rem] font-bold leading-[1.25] tracking-tight text-foreground sm:text-4xl sm:leading-[1.2] lg:text-[2.55rem]">
            {siteConfig.tagline}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" className="min-w-[200px]">
              無料で相談する
            </Button>
            <Button href="/services" variant="secondary" className="min-w-[180px]">
              サービスを見る
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">{siteConfig.responseNote}</p>
        </div>
      </div>
    </section>
  );
}
