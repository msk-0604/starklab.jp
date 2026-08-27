import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

export function Hero() {
  return (
    <section className="relative border-b border-border bg-surface pt-16 sm:pt-[4.25rem]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="max-w-2xl">
          <Image
            src="/brand/stark-lab-logo-mark.png"
            alt={siteConfig.name}
            width={629}
            height={450}
            priority
            className="h-11 w-auto sm:h-12"
          />

          <p className="mt-6 text-sm font-medium text-muted">
            {siteConfig.nameJa}（{siteConfig.coverage}）
          </p>

          <h1 className="mt-3 font-display text-[1.75rem] font-bold leading-[1.3] tracking-tight text-foreground sm:text-4xl sm:leading-[1.25]">
            {siteConfig.tagline}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-[17px]">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" className="min-w-[200px]">
              無料で相談する
            </Button>
            <Button href="/#services" variant="secondary" className="min-w-[180px]">
              サービスを見る
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">{siteConfig.responseNote}</p>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-[var(--shadow-card)]">
          <Image
            src="/images/hero-workdesk.jpg"
            alt="Web制作・SEOの伴走支援"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
