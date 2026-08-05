import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

/** プロジェクトと問い合わせのあいだに置く相談導線 */
export function InquiryBand() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-construction.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 bg-foreground/78" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            建設業のホームページ・DX、まずは1通で相談できます
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            制作・SEO・MEO・運用・現場管理・図面管理・AIまでワンストップ。
            {siteConfig.coverage}です。無理な営業はしません。
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" className="min-w-[200px]">
              相談フォームへ
            </Button>
            <Button
              href={`mailto:${siteConfig.email}`}
              variant="secondary"
              className="min-w-[180px]"
            >
              メールで送る
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
