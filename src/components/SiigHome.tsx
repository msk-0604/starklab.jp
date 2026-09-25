"use client";

import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

/** Our project — ロゴを主役にした高級ギャラリー調 */
export function HomeProject() {
  const kenbei = getProjectBySlug("kenbei");
  if (!kenbei) return null;

  return (
    <section
      id="project"
      className="relative scroll-mt-24 overflow-hidden border-t border-border bg-white py-28 sm:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.07),transparent_58%)]"
        aria-hidden="true"
      />
      <div
        className="siig-project-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <ScrollReveal variant="clip">
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-accent sm:text-xs">
            Our project
          </p>
          <div className="mx-auto mt-5 h-px w-12 bg-accent/70" />
          <h2 className="mt-8 font-display text-[clamp(3rem,10vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-foreground">
            KENBEI
          </h2>
          <p className="mt-5 text-sm tracking-wide text-muted sm:text-base">
            現場管理Webサービス — 自社開発・運営
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1} className="mt-16 flex flex-col items-center sm:mt-20">
          {kenbei.brandLogo ? (
            <div className="relative flex items-center justify-center">
              <div
                className="siig-logo-ring absolute h-[min(78vw,22rem)] w-[min(78vw,22rem)] rounded-full border border-accent/20"
                aria-hidden="true"
              />
              <div
                className="siig-logo-ring-soft absolute h-[min(92vw,26rem)] w-[min(92vw,26rem)] rounded-full border border-foreground/[0.06]"
                aria-hidden="true"
              />
              <div className="siig-logo-float relative z-10 h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64">
                <Image
                  src={kenbei.brandLogo}
                  alt="KENBEIのロゴ"
                  fill
                  sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 256px"
                  className="object-contain drop-shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
                  priority
                />
              </div>
            </div>
          ) : null}

          <p className="mt-14 max-w-2xl text-base leading-[1.85] tracking-wide text-muted sm:mt-16 sm:text-lg">
            {kenbei.description}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
            公式アプリ{" "}
            <a
              href="https://app.kenbei.jp"
              className="font-semibold text-accent transition-colors hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              app.kenbei.jp
            </a>
            ／ 顧客への導入事例ではなく、Stark Labの自社プロダクトです。
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={2}
          className="mt-14 flex flex-col gap-3 sm:mt-16 sm:flex-row sm:justify-center sm:gap-4"
        >
          <Button
            href="https://app.kenbei.jp"
            className="w-full !rounded-none !px-8 !py-4 tracking-wide sm:w-auto"
          >
            KENBEIの詳細を見る
          </Button>
          <Button
            href="https://app.kenbei.jp/signup"
            variant="secondary"
            className="w-full !rounded-none !border-foreground/20 !px-8 !py-4 tracking-wide sm:w-auto"
          >
            14日間無料で試す
          </Button>
          <Button
            href="/works/kenbei"
            variant="secondary"
            className="w-full !rounded-none !border-foreground/20 !px-8 !py-4 tracking-wide sm:w-auto"
          >
            紹介ページ
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

/** Company — コントラストのあるダーク・エディトリアル帯 */
export function HomeCompany() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-[#0c1222] py-28 text-white sm:py-36">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.22),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="siig-hero-grid pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />
      <div className="siig-hairline absolute left-[8%] right-[8%] top-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-[#93c5fd] sm:text-xs">
            Company
          </p>
          <div className="mx-auto mt-5 h-px w-12 bg-[#93c5fd]/70" />
          <h2 className="mt-8 font-display text-[clamp(2.4rem,8vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            {siteConfig.name}
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-base leading-[1.9] tracking-wide text-white/65 sm:text-lg">
            {siteConfig.entityStatement}
            <br />
            読みは「すたーくらぼ」。運営責任者は{siteConfig.owner}。
            拠点は{siteConfig.location}で、打合せはオンライン完結です。
          </p>
          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
            <Link
              href="/about"
              className="text-sm font-semibold tracking-wide text-white transition-opacity hover:opacity-70"
            >
              会社概要を見る
            </Link>
            <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden="true" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-semibold tracking-wide text-[#93c5fd] transition-opacity hover:opacity-80"
            >
              {siteConfig.email}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
