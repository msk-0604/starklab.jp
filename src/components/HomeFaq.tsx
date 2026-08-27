import { homeFaq, siteConfig } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";
import { ScrollReveal } from "./ScrollReveal";

export function HomeFaq() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border bg-surface py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaq)) }}
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <ScrollReveal className="text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            よくあるご質問
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {siteConfig.name}へのご相談前に、多くいただく内容をまとめました。
          </p>
        </ScrollReveal>

        <dl className="mt-12 space-y-6">
          {homeFaq.map((item, index) => (
            <ScrollReveal key={item.question} delay={(Math.min(index + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}>
              <div className="rounded-[var(--radius-card)] border border-border bg-white p-6">
                <dt className="font-display text-lg font-semibold text-foreground">
                  Q. {item.question}
                </dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-muted">
                  {item.answer}
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
