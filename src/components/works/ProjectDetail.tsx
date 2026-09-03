import type { ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { Button } from "../Button";
import { ScrollReveal } from "../ScrollReveal";
import { Breadcrumb, type BreadcrumbItem } from "./Breadcrumb";
import { ProjectCard } from "./ProjectCard";
import { ProjectImage } from "./ProjectImage";

type ProjectDetailProps = {
  project: Project;
  related: Project[];
  breadcrumbs: BreadcrumbItem[];
};

export function ProjectDetail({
  project,
  related,
  breadcrumbs,
}: ProjectDetailProps) {
  return (
    <div className="pb-20 sm:pb-28">
      {/* Hero */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
          <Breadcrumb items={breadcrumbs} className="mb-8" />

          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-accent">
              {project.category}
            </p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.cta.href ? (
                <Button href={project.cta.href}>
                  {project.cta.label}
                  <ExternalIcon />
                </Button>
              ) : null}
              <Button href="/#contact" variant="secondary">
                お問い合わせ
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1} className="mt-10 sm:mt-12">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-[var(--shadow-card)] sm:aspect-[16/9]">
              <ProjectImage
                src={project.coverImage}
                alt={`${project.title}のカバー画像`}
                fill
                sizes="(max-width: 1024px) 100vw, 1152px"
                priority
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Overview */}
        <Section title="概要" label="Overview">
          <p className="text-[15px] leading-relaxed text-muted sm:text-base">
            {project.overview}
          </p>
          {project.features && project.features.length > 0 ? (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground shadow-[var(--shadow-card)]"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                    aria-hidden="true"
                  >
                    <CheckIcon />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          ) : null}
        </Section>

        {/* Background */}
        <Section title="制作背景" label="Background" surface>
          <p className="text-[15px] leading-relaxed text-muted sm:text-base">
            {project.background}
          </p>
        </Section>

        {/* Case study flow: 課題 → 提案 → 設計 → 実装 → 成果 */}
        <CaseBlock
          label="Challenge"
          title="課題"
          items={project.challenges}
          variant="dot"
        />
        <CaseBlock
          label="Proposal"
          title="提案"
          items={project.proposal}
          variant="check"
          surface
        />
        <CaseBlock
          label="Design"
          title="設計"
          items={project.design}
          variant="check"
        />
        <CaseBlock
          label="Implementation"
          title="実装"
          items={project.implementation}
          variant="check"
          surface
        />
        {project.outcomes && project.outcomes.length > 0 ? (
          <CaseBlock
            label="Outcomes"
            title="成果"
            items={project.outcomes}
            variant="check"
          />
        ) : null}

        {/* Highlights */}
        <Section title="対応ポイント" label="Highlights">
          <ul className="flex flex-wrap gap-3">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Desktop captures */}
        <Section title="画面キャプチャ" label="Desktop" surface>
          <div className="grid gap-6">
            {project.desktopImages.map((src, index) => (
              <ScrollReveal key={src} delay={(Math.min(index, 4) || 0) as 0 | 1 | 2 | 3 | 4}>
                <figure className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1">
                  <div className="relative aspect-[16/10]">
                    <ProjectImage
                      src={src}
                      alt={`${project.title}のデスクトップ画面 ${index + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1152px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-border px-5 py-3 text-sm text-muted">
                    デスクトップ表示イメージ {index + 1}
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* Mobile */}
        <Section title="スマホ表示" label="Mobile">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {project.mobileImages.map((src, index) => (
              <ScrollReveal
                key={src}
                delay={(Math.min(index + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}
                className="w-full max-w-[280px]"
              >
                <figure className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[var(--shadow-card)] transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="relative aspect-[9/16]">
                    <ProjectImage
                      src={src}
                      alt={`${project.title}のスマホ画面 ${index + 1}`}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-border px-4 py-3 text-center text-sm text-muted">
                    スマートフォン表示
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <ScrollReveal className="mt-4 rounded-[var(--radius-card)] bg-foreground px-6 py-10 text-center sm:px-10 sm:py-14">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            ご相談はこちら
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            プロダクトやDXについて、お気軽にお問い合わせください。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {project.cta.href ? (
              <Button
                href={project.cta.href}
                variant="secondary"
                className="min-w-[160px]"
              >
                {project.cta.label}
              </Button>
            ) : null}
            <Button href="/#contact" className="min-w-[160px]">
              相談する
            </Button>
            <Button href="/services" variant="secondary" className="min-w-[160px]">
              サービス一覧
            </Button>
          </div>
        </ScrollReveal>

        {/* Related */}
        {related.length > 0 ? (
          <section className="mt-20 sm:mt-28">
            <ScrollReveal className="text-center">
              <p className="text-sm font-semibold tracking-wide text-accent">
                Related
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
                関連実績
              </h2>
            </ScrollReveal>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
              {related.map((item, index) => (
                <li key={item.slug}>
                  <ProjectCard
                    project={item}
                    compact
                    delay={(Math.min(index + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function CaseBlock({
  label,
  title,
  items,
  variant,
  surface = false,
}: {
  label: string;
  title: string;
  items: string[];
  variant: "dot" | "check";
  surface?: boolean;
}) {
  return (
    <section className="py-10 sm:py-12">
      <ScrollReveal>
        <div
          className={
            surface
              ? "rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8"
              : ""
          }
        >
          <p className="text-sm font-semibold tracking-wide text-accent">{label}</p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <ul className="mt-6 space-y-4">
            {items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[15px] leading-relaxed text-muted"
              >
                {variant === "check" ? (
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent"
                    aria-hidden="true"
                  >
                    <CheckIcon className="h-3 w-3" />
                  </span>
                ) : (
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/30"
                    aria-hidden="true"
                  />
                )}
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </section>
  );
}

function Section({
  title,
  label,
  children,
  surface = false,
}: {
  title: string;
  label: string;
  children: ReactNode;
  surface?: boolean;
}) {
  return (
    <section className="py-12 sm:py-16">
      <ScrollReveal>
        <p className="text-sm font-semibold tracking-wide text-accent">{label}</p>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <div
          className={`mt-6 sm:mt-8 ${
            surface
              ? "rounded-[var(--radius-card)] border border-border bg-surface p-5 sm:p-8"
              : ""
          }`}
        >
          {children}
        </div>
      </ScrollReveal>
    </section>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 12 12 4M7 4h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
