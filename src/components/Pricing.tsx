import { formatYen, pricingIncludes, siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

export function Pricing() {
  const { initial, monthly } = siteConfig.pricing;

  return (
    <section id="pricing" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            料金
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            初期費用ゼロ。わかりやすい月額定額制です。
          </p>
        </ScrollReveal>

        <ScrollReveal className="mx-auto mt-14 max-w-3xl" delay={1}>
          <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <div className="border-b border-border bg-gradient-to-br from-accent/[0.06] to-transparent px-6 py-10 text-center sm:px-12 sm:py-12">
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-4">
                <div>
                  <p className="text-sm font-medium text-muted">初期費用</p>
                  <p className="mt-2 font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                    {formatYen(initial)}
                    <span className="ml-1 text-2xl font-semibold">円</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">（税込）</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">月額料金</p>
                  <p className="mt-2 font-display text-5xl font-bold tracking-tight text-accent sm:text-6xl">
                    {formatYen(monthly)}
                    <span className="ml-1 text-2xl font-semibold">円</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">（税込）</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-8 sm:px-12 sm:py-10">
              <h3 className="text-center text-base font-semibold text-foreground">
                料金に含まれる内容
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {pricingIncludes.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-sm font-medium text-foreground"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-white"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3.5 w-3.5 fill-current"
                      >
                        <path d="M7.7 13.3 4.4 10l-1.4 1.4 4.7 4.7L17.4 6.4 16 5l-8.3 8.3Z" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex justify-center">
                <Button href="/#contact" className="min-w-[220px]">
                  無料相談はこちら
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
