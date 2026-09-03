import Link from "next/link";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { siteConfig } from "@/lib/site";

type Faq = { question: string; answer: string };
type ProcessStep = { step: string; title: string; body: string };

type ContentLandingPageProps = {
  breadcrumbs: { label: string; href?: string }[];
  badge: string;
  title: string;
  summary: string;
  whatIs: string;
  problems: string[];
  whoFor?: string[];
  capabilities?: string[];
  useCases?: string[];
  implementationNotes?: string[];
  howWeHelp?: string;
  process?: ProcessStep[];
  pricingNote?: string;
  faqs: Faq[];
  ctaLabel: string;
  ctaHref?: string;
  relatedLinks?: { label: string; href: string }[];
};

export function ContentLandingPage({
  breadcrumbs,
  badge,
  title,
  summary,
  whatIs,
  problems,
  whoFor,
  capabilities,
  useCases,
  implementationNotes,
  howWeHelp,
  process,
  pricingNote,
  faqs,
  ctaLabel,
  ctaHref = "/#contact",
  relatedLinks,
}: ContentLandingPageProps) {
  return (
    <main className="flex-1">
      <section className="border-b border-border bg-surface pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
          <Breadcrumb items={breadcrumbs} />
          <p className="mt-6 text-sm font-semibold tracking-wide text-accent">{badge}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            {summary}
          </p>
          <div className="mt-8">
            <Button href={ctaHref} className="!py-4">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            {title.includes("DX") || title.includes("業") ? "これは何か" : "これは何か"}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{whatIs}</p>
        </ScrollReveal>
      </section>

      <section className="border-t border-border bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-foreground">解決できる課題</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {problems.map((p) => (
                <li
                  key={p}
                  className="rounded-[var(--radius-card)] border border-border bg-surface px-4 py-3 text-sm text-muted"
                >
                  {p}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {whoFor && whoFor.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-foreground">対象企業</h2>
            <ul className="mt-6 space-y-2 text-muted">
              {whoFor.map((w) => (
                <li key={w} className="flex gap-2 text-sm sm:text-base">
                  <span className="text-accent">•</span>
                  {w}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </section>
      )}

      {capabilities && capabilities.length > 0 && (
        <section className="border-t border-border bg-surface py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-foreground">提供内容</h2>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {capabilities.map((c) => (
                  <li key={c} className="text-sm text-muted sm:text-base">{c}</li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      )}

      {useCases && useCases.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-foreground">具体例・ユースケース</h2>
            <ul className="mt-6 space-y-3">
              {useCases.map((u) => (
                <li key={u} className="text-sm leading-relaxed text-muted sm:text-base">{u}</li>
              ))}
            </ul>
          </ScrollReveal>
        </section>
      )}

      {implementationNotes && implementationNotes.length > 0 && (
        <section className="border-t border-border bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-foreground">実装イメージ</h2>
              <p className="mt-2 text-sm text-muted">
                実装済み・対応可能・要件次第の構想を分けて記載しています。
              </p>
              <ul className="mt-6 space-y-3">
                {implementationNotes.map((n) => (
                  <li key={n} className="text-sm leading-relaxed text-muted sm:text-base">{n}</li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      )}

      {howWeHelp && (
        <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Stark Labの支援方法
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{howWeHelp}</p>
          </ScrollReveal>
        </section>
      )}

      {process && process.length > 0 && (
        <section className="border-t border-border bg-surface py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-foreground">導入プロセス</h2>
              <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {process.map((s) => (
                  <li key={s.step} className="border-t border-border pt-4">
                    <p className="text-xs font-semibold text-accent">{s.step}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>
      )}

      {pricingNote && (
        <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <ScrollReveal>
            <h2 className="font-display text-xl font-bold text-foreground">費用について</h2>
            <p className="mt-3 text-sm text-muted sm:text-base">{pricingNote}</p>
          </ScrollReveal>
        </section>
      )}

      {relatedLinks && relatedLinks.length > 0 && (
        <section className="border-t border-border bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-foreground">関連リンク</h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {relatedLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-14 sm:py-16" id="faq">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold text-foreground">よくある質問</h2>
            <dl className="mt-8 space-y-6">
              {faqs.map((f) => (
                <div key={f.question} className="border-b border-border pb-6">
                  <dt className="font-semibold text-foreground">{f.question}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    {f.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            まずは課題をお聞かせください
          </h2>
          <p className="mt-3 text-muted">{siteConfig.responseNote}</p>
          <div className="mt-8">
            <Button href={ctaHref} className="!py-4">{ctaLabel}</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
