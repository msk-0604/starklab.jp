import Image from "next/image";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-foreground pt-16 sm:pt-20">
      <div className="relative min-h-[78vh] sm:min-h-[86vh]">
        <Image
          src="/images/hero-construction.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_center]"
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(9,28,32,0.78)_0%,rgba(9,28,32,0.55)_45%,rgba(9,28,32,0.25)_100%)]"
          aria-hidden="true"
        />

        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-5 pb-36 pt-14 sm:min-h-[86vh] sm:px-8 sm:pb-44">
          <p
            className="hero-line hero-line-1 font-heading text-[2.6rem] font-semibold uppercase leading-[1.02] tracking-[0.02em] text-white sm:text-6xl lg:text-[5.25rem]"
            aria-hidden="true"
          >
            Web, AI, System
            <br />
            and
            <br />
            Data
          </p>
          <h1 className="hero-line hero-line-2 mt-6 text-base font-bold leading-relaxed text-white sm:text-lg lg:text-xl">
            企業の業務と集客を、実装まで伴走するDX/AI開発パートナー
          </h1>
          <p className="hero-line hero-line-3 mt-2 text-sm text-white/75">
            {siteConfig.name}（{siteConfig.nameJa}）
          </p>
        </div>
      </div>
    </section>
  );
}
