import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

/** SIIG型「Our project」— KENBEIのみ */
export function HomeProject() {
  const kenbei = getProjectBySlug("kenbei");
  if (!kenbei) return null;

  return (
    <section id="project" className="scroll-mt-24 border-t border-border bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">
            Our project
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            KENBEI
          </h2>
          <p className="mt-2 text-sm text-muted">現場管理Webサービス（自社開発・運営）</p>
        </ScrollReveal>

        <ScrollReveal delay={1} className="mt-12 flex flex-col items-center">
          {kenbei.brandLogo ? (
            <div className="relative h-28 w-28 sm:h-36 sm:w-36">
              <Image
                src={kenbei.brandLogo}
                alt="KENBEIのロゴ"
                fill
                sizes="(max-width: 640px) 112px, 144px"
                className="object-contain drop-shadow-[0_8px_24px_rgba(15,23,42,0.14)]"
                priority
              />
            </div>
          ) : null}
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {kenbei.description}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
            公式アプリは{" "}
            <a
              href="https://app.kenbei.jp"
              className="font-medium text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              app.kenbei.jp
            </a>
            。顧客への導入事例ではなく、Stark Labの自社プロダクトです。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={2} className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
    <section className="border-t border-border bg-surface py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">Company</p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {siteConfig.name}
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted">
            {siteConfig.entityStatement}
            <br />
            読みは「すたーくらぼ」。運営責任者は{siteConfig.owner}。
            拠点は{siteConfig.location}で、打合せはオンライン完結です。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/about"
              className="text-sm font-semibold text-accent hover:underline"
            >
              会社概要を見る
            </Link>
            <span className="hidden text-muted sm:inline" aria-hidden="true">
              ·
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-semibold text-accent hover:underline"
            >
              {siteConfig.email}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
