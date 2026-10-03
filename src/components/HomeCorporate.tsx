import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { getServiceBySlug } from "@/lib/services";
import { siteConfig } from "@/lib/site";

/** SERVICE / OUTLINE などの中央寄せ見出し */
function CenteredHeading({ en, ja }: { en: string; ja: string }) {
  return (
    <div className="text-center">
      <p className="text-base tracking-[0.08em] text-foreground/80">{en}</p>
      <span className="mx-auto mt-3 block h-px w-8 bg-foreground/50" aria-hidden="true" />
      <h2 className="mt-4 text-2xl font-bold tracking-wide text-accent sm:text-[1.9rem]">{ja}</h2>
    </div>
  );
}

/** ヒーロー下に重なる「事業内容」カード */
export function HomeServiceIntro() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-tint">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 sm:px-8 sm:pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <div className="relative z-10 -mt-24 bg-white px-7 pb-12 pt-10 shadow-[0_24px_60px_rgba(0,0,0,0.08)] sm:-mt-32 sm:px-14 sm:pb-16 sm:pt-12">
          <CenteredHeading en="SERVICE" ja="事業内容" />
          <p className="mt-7 text-[15px] leading-[2.1] tracking-wide text-foreground/80 sm:text-base">
            {siteConfig.name}（{siteConfig.nameJa}）は、貴社の業務と集客を深く理解し、Web・AI・業務システム・データ活用を組み合わせた最適なソリューションをご提案します。
            <br />
            ツールを入れるだけでなく、現場で使える実装と改善まで伴走します。業務の課題整理から、お気軽にご相談ください。
          </p>
          <p className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              サービス一覧を見る
              <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>

        <ScrollReveal variant="fade" className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src="/images/hero-system.jpg"
            alt="オフィスのデスクに並ぶダッシュボードを表示したモニターとノートPC"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

type Feature = {
  id: string;
  en: string;
  ja: string;
  lead: string;
  serviceSlugs: string[];
  image: { src: string; alt: string; position: string };
  imageSide: "left" | "right";
  tinted: boolean;
};

const features: Feature[] = [
  {
    id: "web-system",
    en: "Web & System",
    ja: "Web・システム開発",
    lead:
      "集客の入口となるWebサイトから、案件・工程・顧客を管理する業務システムまで、貴社の業務フローに合わせて設計・開発します。検索やAI検索からの流入、問い合わせまでを一つの導線として捉え、成果につながる仕組みをつくります。",
    serviceSlugs: ["web-development", "system-development", "seo-ai-search"],
    image: {
      src: "/images/web-starklab-laptop.jpg",
      alt: "Stark LabのWebサイトを表示したノートPC",
      position: "object-center",
    },
    imageSide: "right",
    tinted: false,
  },
  {
    id: "ai-data",
    en: "AI & Data",
    ja: "AI・データ活用",
    lead:
      "問い合わせ対応や文書作成などの定型業務をAIで自動化し、売上・案件などのデータを可視化して意思決定に使える形に整えます。PoCから段階的に、現場で定着するAI活用を実装します。",
    serviceSlugs: ["ai-automation", "data-dashboard"],
    image: {
      src: "/images/hero-system.jpg",
      alt: "グラフや地図を表示した業務ダッシュボード",
      position: "object-[72%_center]",
    },
    imageSide: "left",
    tinted: true,
  },
];

function FeatureSection({ feature }: { feature: Feature }) {
  const services = feature.serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((svc) => svc !== undefined);
  const imageLeft = feature.imageSide === "left";

  return (
    <section
      id={feature.id}
      className={`scroll-mt-24 py-20 sm:py-28 ${feature.tinted ? "bg-tint" : "bg-white"}`}
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-14">
        <ScrollReveal
          variant="fade"
          className={`relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5] ${
            imageLeft
              ? "rounded-l-[5rem] sm:rounded-l-[7rem] lg:order-1"
              : "rounded-r-[5rem] sm:rounded-r-[7rem] lg:order-2"
          }`}
        >
          <Image
            src={feature.image.src}
            alt={feature.image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover ${feature.image.position}`}
          />
        </ScrollReveal>

        <ScrollReveal className={imageLeft ? "lg:order-2" : "lg:order-1"}>
          <h2>
            <span className="block font-heading text-[2rem] font-semibold uppercase leading-none tracking-[0.01em] text-accent sm:text-[2.4rem]">
              {feature.en}
            </span>
            <span className="mt-3 block text-lg font-bold tracking-wide text-foreground/85">
              {feature.ja}
            </span>
          </h2>
          <p className="mt-5 border-b border-accent pb-7 text-[15px] leading-[1.9] tracking-wide text-foreground/75">
            {feature.lead}
          </p>

          <ul className="mt-8 space-y-7">
            {services.map((svc) => (
              <li key={svc.slug}>
                <h3>
                  <Link
                    href={`/services/${svc.slug}`}
                    className="group inline-flex items-center gap-2 text-[17px] font-bold tracking-wide text-foreground/85 transition-colors hover:text-accent"
                  >
                    {svc.shortTitle}
                    <span
                      className="text-sm text-accent transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] leading-[1.85] tracking-wide text-muted">
                  {svc.summary}
                </p>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function HomeFeatures() {
  return (
    <>
      {features.map((feature) => (
        <FeatureSection key={feature.id} feature={feature} />
      ))}
    </>
  );
}

const outlineRows = [
  { label: "名称", value: `${siteConfig.name}（${siteConfig.nameJa}）` },
  { label: "運営責任者", value: siteConfig.owner },
  {
    label: "事業内容",
    value:
      "Web制作／業務システム開発／AI自動化／データ可視化／SEO・AI検索／DXコンサルティング",
  },
  { label: "自社サービス", value: "KENBEI（現場管理Webサービス）" },
  { label: "お問い合わせ", value: siteConfig.email },
] as const;

export function HomeOutline() {
  return (
    <section id="outline" className="scroll-mt-24 bg-tint py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <ScrollReveal>
          <CenteredHeading en="OUTLINE" ja="会社概要" />
        </ScrollReveal>
        <ScrollReveal>
          <dl className="mt-12 border-t border-foreground/15">
            {outlineRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-b border-foreground/15 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6 sm:py-6"
              >
                <dt className="text-[15px] font-bold tracking-wide text-accent">{row.label}</dt>
                <dd className="text-[15px] leading-relaxed tracking-wide text-foreground/80">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              会社概要を詳しく見る
              <span aria-hidden="true">→</span>
            </Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
