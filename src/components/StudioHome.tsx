import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

/**
 * SIIG型ホーム：
 * SaaSヒーロー（青グラデ／グリッド／中央CTA）を捨て、
 * 紙地＋明朝／セリフで「プロダクト運営スタジオ」の1枚にする。
 */
export function StudioHome() {
  const kenbei = getProjectBySlug("kenbei");

  return (
    <div className="bg-background">
      {/* Masthead — 短い自己紹介のみ */}
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36">
        <p className="text-[13px] tracking-[0.08em] text-muted">{siteConfig.nameJa}</p>
        <h1 className="mt-3 font-display text-[clamp(2.75rem,8vw,5.5rem)] font-normal leading-[1.05] tracking-tight text-foreground">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
          {siteConfig.tagline}
        </p>
      </section>

      <div className="studio-rule mx-auto max-w-5xl" />

      {/* Our project — SIIGの主役 */}
      <section id="project" className="scroll-mt-24 mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
        <ScrollReveal>
          <p className="text-[13px] tracking-[0.14em] text-muted">Our project</p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.25rem)] font-normal leading-[1.1] tracking-tight">
            KENBEI
          </h2>
          <p className="mt-3 text-sm text-muted">現場管理Webサービス（自社開発・運営）</p>
        </ScrollReveal>

        {kenbei?.brandLogo ? (
          <ScrollReveal delay={1} className="mt-14 flex justify-start sm:mt-16">
            <div className="logo-breathe relative h-36 w-36 sm:h-44 sm:w-44">
              <Image
                src={kenbei.brandLogo}
                alt="KENBEIのロゴ"
                fill
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain"
                priority
              />
            </div>
          </ScrollReveal>
        ) : null}

        <ScrollReveal delay={2} className="mt-12 max-w-xl">
          <p className="text-[15px] leading-[1.95] text-foreground/85 sm:text-base">
            {kenbei?.description}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            公式アプリは{" "}
            <a
              href="https://app.kenbei.jp"
              className="underline decoration-foreground/30 underline-offset-4 transition hover:decoration-foreground"
              target="_blank"
              rel="noopener noreferrer"
            >
              app.kenbei.jp
            </a>
            。顧客事例ではなく、Stark Labの自社プロダクトです。
          </p>

          <ul className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
            <li>
              <a
                href="https://app.kenbei.jp"
                className="text-[15px] font-medium underline decoration-foreground underline-offset-[6px] transition hover:opacity-60"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website
              </a>
            </li>
            <li>
              <a
                href="https://app.kenbei.jp/signup"
                className="text-[15px] font-medium underline decoration-foreground underline-offset-[6px] transition hover:opacity-60"
                target="_blank"
                rel="noopener noreferrer"
              >
                14日間無料で試す
              </a>
            </li>
            <li>
              <Link
                href="/works/kenbei"
                className="text-[15px] font-medium underline decoration-foreground/35 underline-offset-[6px] transition hover:decoration-foreground"
              >
                紹介ページ
              </Link>
            </li>
          </ul>
        </ScrollReveal>
      </section>

      <div className="studio-rule mx-auto max-w-5xl" />

      {/* Company */}
      <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-24">
        <ScrollReveal>
          <p className="text-[13px] tracking-[0.14em] text-muted">Company</p>
          <h2 className="mt-4 font-display text-3xl font-normal tracking-tight sm:text-4xl">
            {siteConfig.name}
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-[1.95] text-muted">
            {siteConfig.entityStatement}
            <br />
            読みは「すたーくらぼ」。運営：{siteConfig.owner} ／ 拠点：{siteConfig.location}
            （オンライン完結）
          </p>
          <p className="mt-8">
            <Link
              href="/about"
              className="text-[15px] font-medium underline decoration-foreground/35 underline-offset-[6px] transition hover:decoration-foreground"
            >
              会社概要
            </Link>
            <span className="mx-3 text-muted/40">/</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[15px] font-medium underline decoration-foreground/35 underline-offset-[6px] transition hover:decoration-foreground"
            >
              {siteConfig.email}
            </a>
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
