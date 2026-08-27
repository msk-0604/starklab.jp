/**
 * Stark Lab サイト設定
 * ※ 所在地・電話番号は特定商取引法に基づく表記ページのみで使用します。
 */
export const siteConfig = {
  name: "Stark Lab",
  nameJa: "スタークラボ",
  concept: "Web・システム・AIの開発パートナー",
  tagline: "Web・システム・AIを、現場で使える形にする",
  description:
    "スタークラボ（Stark Lab）は、ホームページ制作、業務システム、AI活用、SEO・運用まで設計するITパートナーです。日本全国どこでもオンラインで対応します。",
  seoTitle:
    "スタークラボ（Stark Lab）｜Web制作・システム開発・AI活用（全国対応）",
  seoDescription:
    "ホームページ制作、業務システム、AI活用、SEO・運用まで。日本全国どこでもオンライン対応。拠点は滋賀県。",
  coverage: "全国対応",
  coverageNote:
    "日本全国どこでも対応します。打合せ・納品はオンライン完結です。拠点は滋賀県ですが、エリアによる制限はありません。",
  location: "滋賀県",
  responseNote: "2営業日以内を目安にご返信します",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://starklab.jp",
  owner: "山本 真樹",
  email: "yamamasaki0604@icloud.com",
  /** 特商法ページのみ表示 */
  address: "滋賀県大津市坂本6丁目15-28",
  /** 特商法ページのみ表示 */
  phone: "080-9064-0604",
  /** 特商法・利用規約のみで使用。公開ページでは表示しない */
  pricing: {
    initial: 0,
    monthly: 22000,
    currency: "JPY" as const,
  },
  paymentMethod: "クレジットカード（Stripe）",
} as const;

/** ワンストップで提供するサービス */
export const offerings = [
  {
    id: "system",
    title: "システム開発",
    description:
      "業務フローに合わせたWebシステム、管理画面、社内ツールを設計・開発します。",
  },
  {
    id: "ai",
    title: "AI活用",
    description:
      "問い合わせ対応、資料作成、データ整理など、現場で使えるAIの導入を設計します。",
  },
  {
    id: "homepage",
    title: "ホームページ制作",
    description:
      "問い合わせにつながる構成と文章で、コーポレートサイトやサービスサイトを制作します。",
  },
  {
    id: "seo",
    title: "SEO対策",
    description:
      "検索されやすい情報設計、記事運用、内部リンクまで。継続的に改善します。",
  },
  {
    id: "meo",
    title: "MEO対策",
    description:
      "Googleビジネスプロフィールの整備と運用で、地域からの発見を後押しします。",
  },
  {
    id: "maintenance",
    title: "保守・運用",
    description:
      "公開後の更新、表示速度、セキュリティまで継続サポートします。",
  },
  {
    id: "kensapo",
    title: "KenSapo",
    description:
      "現場・写真・工程・日報をまとめるクラウド現場管理システムです。",
  },
  {
    id: "drawstock",
    title: "DrawStock",
    description:
      "図面・PDFの共有・検索・権限管理をクラウドで実現する資料管理システムです。",
  },
] as const;

/** 対応業種（建設業に強みつつ、他業種も歓迎） */
export const industries = [
  "IT・SaaS",
  "製造・メーカー",
  "店舗・飲食・小売",
  "士業・コンサル",
  "医療・福祉",
  "建設・設備",
  "その他サービス業",
] as const;

export const homeFaq = [
  {
    question: "対応エリアはどこですか？",
    answer:
      "日本全国どこでも対応します。打合せ・納品はオンライン完結です。拠点は滋賀県にあります。",
  },
  {
    question: "どんな相談ができますか？",
    answer:
      "ホームページ制作、業務システム、AI活用、SEO・運用までご相談いただけます。業種は問いません。",
  },
  {
    question: "システム開発だけの依頼も可能ですか？",
    answer:
      "可能です。管理画面、社内ツール、既存業務のデジタル化など、必要な範囲から始められます。",
  },
  {
    question: "SEO・MEOはどこまで対応しますか？",
    answer:
      "サイトの情報設計、タイトル・説明文、内部リンク、記事運用まで対応します。Googleビジネスプロフィールの整備もご相談ください。",
  },
  {
    question: "料金の目安を教えてください。",
    answer:
      "規模と範囲によって異なります。まずは無料相談で課題を整理し、必要な範囲だけお見積りします。",
  },
] as const;

/** 問い合わせの相談種別 */
export const contactTopics = [
  { value: "system", label: "システム開発について" },
  { value: "ai", label: "AI活用について" },
  { value: "homepage", label: "ホームページ制作について" },
  { value: "seo-meo", label: "SEO・MEOについて" },
  { value: "maintenance", label: "保守・運用について" },
  { value: "kensapo", label: "KenSapo（現場管理）について" },
  { value: "drawstock", label: "DrawStock（図面管理）について" },
  { value: "other", label: "その他・まとめて相談" },
] as const;

export const navLinks = [
  { href: "/services", label: "サービス" },
  { href: "/works", label: "実績" },
  { href: "/media", label: "Media" },
  { href: "/areas", label: "対応エリア" },
  { href: "/#contact", label: "お問い合わせ" },
] as const;

export function formatYen(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount);
}
