"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { getAllServices } from "@/lib/services";
import { getAllIndustries } from "@/lib/industries-content";
import { siteConfig } from "@/lib/site";

const challenges = [
  "業務がExcel・紙・メールに散らばり、全体像が見えない",
  "Web・システム・AIが別ベンダーで分断されている",
  "AIを試したが現場で定着しない",
  "検索・問い合わせが伸びず、改善の手がかりがない",
  "データはあるが、意思決定に使えていない",
] as const;

const integrationPoints = [
  {
    title: "Web",
    body: "集客・信頼・問い合わせ導線。SEO/AI検索を意識した情報設計。",
  },
  {
    title: "System",
    body: "顧客・案件・工程・図面など、業務フローに合わせた実装。",
  },
  {
    title: "AI",
    body: "自動化・エージェント・RAGで、知識と定型業務を支援。",
  },
  {
    title: "Data",
    body: "KPI・案件・流入を可視化し、改善の判断材料に。",
  },
] as const;

const processSteps = [
  { step: "01", title: "ヒアリング", body: "課題・目的・現状ツールを整理します。" },
  { step: "02", title: "設計", body: "Web・System・AI・Dataのどこから手を付けるかを合意します。" },
  { step: "03", title: "実装", body: "PoCから段階的に、現場で使える形まで開発します。" },
  { step: "04", title: "改善", body: "計測・運用・次の打ち手まで伴走します。" },
] as const;

const whyUs = [
  "Web制作会社ではなく、実装まで担うDX/AI開発パートナー",
  "建設・製造・中小企業など、業種ごとの課題に合わせた設計",
  "KENBEI・DrawStockなど、自社プロダクトの開発実績",
  "検索・AI・コンテンツ・CVをつなぐ成長基盤の設計",
  "全国オンライン対応、無理な営業はしません",
] as const;

export function HomeAbout() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">About</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stark Lab（スタークラボ）とは
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.entityStatement}
            ホームページを作るだけではなく、業務システム・AI自動化・ナレッジAI・データ可視化・検索/AI流入の改善まで、
            <strong className="font-semibold text-foreground">企業の業務と集客を一気通貫で実装</strong>
            します。
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            読みは「すたーくらぼ」。対象は建設・製造・不動産・中小企業・店舗・サービス業など、DX需要のある企業全般です。
            何でも屋ではなく、Web × AI × System × Data の実装力で伴走します。
          </p>
          <p className="mt-4">
            <Link href="/about" className="text-sm font-medium text-accent hover:underline">
              会社概要を見る →
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function HomeChallenges() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Challenges</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            企業が抱える課題
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {challenges.map((c) => (
              <li
                key={c}
                className="rounded-[var(--radius-card)] border border-border bg-white px-4 py-3 text-sm text-muted"
              >
                {c}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function HomeIntegrated() {
  return (
    <section className="border-t border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Integration</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Web × AI × System × Data
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            分断された施策では現場は変わりません。Stark Labは4領域を一体で設計します。
          </p>
        </ScrollReveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {integrationPoints.map((item, i) => (
            <ScrollReveal key={item.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <article className="border-t border-border pt-4">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function HomeServicesGrid() {
  const services = getAllServices();
  return (
    <section id="services" className="scroll-mt-24 bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Services</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            8つの専門サービス
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            技術領域ごとに専門ページで詳しく解説しています。
          </p>
        </ScrollReveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, index) => (
            <ScrollReveal key={svc.slug} delay={(index % 4) as 0 | 1 | 2 | 3} as="li">
              <Link
                href={`/services/${svc.slug}`}
                className="group flex h-full flex-col border-t border-border pt-5 transition hover:border-accent/50"
              >
                <h3 className="font-display text-[17px] font-semibold text-foreground group-hover:text-accent">
                  {svc.shortTitle}
                </h3>
                <p className="mt-2 text-sm text-muted">{svc.summary}</p>
                <span className="mt-4 text-xs font-medium text-accent">詳しく見る →</span>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
        <div className="mt-10">
          <Link href="/services" className="text-sm font-medium text-accent hover:underline">
            サービス一覧ページへ
          </Link>
        </div>
      </div>
    </section>
  );
}

export function HomeIndustriesGrid() {
  const industries = getAllIndustries();
  return (
    <section id="industries" className="scroll-mt-24 border-t border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Industries</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            業種別ソリューション
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            業界の課題に合わせたユースケースと、利用できるサービスを整理しています。
          </p>
        </ScrollReveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="block rounded-[var(--radius-card)] border border-border p-5 transition hover:border-accent/40 hover:shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {ind.name}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{ind.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/industries" className="mt-8 inline-block text-sm font-medium text-accent">
          業種別一覧へ →
        </Link>
      </div>
    </section>
  );
}

export function HomeProcess() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Process</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            導入プロセス
          </h2>
        </ScrollReveal>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s) => (
            <li key={s.step} className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-accent">{s.step}</p>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function HomeWhyUs() {
  return (
    <section className="border-t border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Why Stark Lab</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            選ばれる理由
          </h2>
          <ul className="mt-8 space-y-3">
            {whyUs.map((w) => (
              <li key={w} className="flex gap-2 text-sm text-muted sm:text-base">
                <span className="text-accent">✓</span>
                {w}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function HomeKnowledge() {
  return (
    <section className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Knowledge</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Stark Lab Knowledge
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Web・AI・DX・SEOに関する記事を、サービス・業種・実績とつなげて読めるメディアです。
          </p>
          <Link
            href="/media"
            className="mt-6 inline-flex items-center text-sm font-medium text-accent hover:underline"
          >
            Knowledge（Media）を見る →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
