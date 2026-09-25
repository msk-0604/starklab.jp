"use client";

import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

/** SIIG型「Our project」— 大きなロゴ演出＋KENBEIのみ */
export function HomeProject() {
  const kenbei = getProjectBySlug("kenbei");
  if (!kenbei) return null;

  return (
    <section
      id="project"
      className="relative scroll-mt-24 overflow-hidden border-t border-border bg-white py-24 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(37,99,235,0.09),transparent_60%)]"
        aria-hidden="true"
      />
      <div
        className="siig-project-grid pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ScrollReveal variant="clip">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            Our project
          </p>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            KENBEI
          </h2>
          <p className="mt-3 text-sm text-muted sm:text-base">
            現場管理Webサービス（自社開発・運営）
          </p>
        </ScrollReveal>

        <ScrollReveal delay={1} className="mt-14 flex flex-col items-center">
          {kenbei.brandLogo ? (
            <div className="siig-logo-float relative h-40 w-40 sm:h-52 sm:w-52 md:h-60 md:w-60">
              <Image
                src={kenbei.brandLogo}
                alt="KENBEIのロゴ"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 768px) 208px, 240px"
                className="object-contain drop-shadow-[0_24px_60px_rgba(15,23,42,0.16)]"
                priority
              />
            </div>
          ) : null}
          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {kenbei.description}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            公式アプリは{" "}
            <a
              href="https://app.kenbei.jp"
              className="font-medium text-accent transition-colors hover:text-accent-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              app.kenbei.jp
            </a>
            。顧客への導入事例ではなく、Stark Labの自社プロダクトです。
          </p>
        </ScrollReveal>

        <ScrollReveal
          delay={2}
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center"
        >
          <Button href="https://app.kenbei.jp" className="w-full sm:w-auto">
            KENBEIの詳細を見る
          </Button>
          <Button
            href="https://app.kenbei.jp/signup"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            14日間無料で試す
          </Button>
          <Button href="/works/kenbei" variant="secondary" className="w-full sm:w-auto">
            紹介ページ
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}

/** SIIG型の会社情報ブロック */
export function HomeCompany() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface py-24 sm:py-28">
      <div
        className="siig-project-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
            Company
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {siteConfig.name}
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base leading-relaxed text-muted">
            {siteConfig.entityStatement}
            <br />
            読みは「すたーくらぼ」。運営責任者は{siteConfig.owner}。
            拠点は{siteConfig.location}で、打合せはオンライン完結です。
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/about"
              className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              会社概要を見る →
            </Link>
            <span className="hidden text-muted/50 sm:inline" aria-hidden="true">
              /
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-semibold text-foreground transition-opacity hover:opacity-70"
            >
              {siteConfig.email}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
