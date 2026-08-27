import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

/** プロジェクトと問い合わせのあいだに置く相談導線 */
export function InquiryBand() {
  return (
    <section className="border-y border-border bg-foreground py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            まずは課題整理から。1通で相談できます
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            ホームページ・SEO・MEO・運用・業務改善まで。{siteConfig.coverage}。
            無理な営業はしません。
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
