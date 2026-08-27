/**
 * Stark Lab サイト設定
 * ※ 所在地・電話番号は特定商取引法に基づく表記ページのみで使用します。
 */
export const siteConfig = {
  name: "Stark Lab",
  nameJa: "スタークラボ",
  concept: "ホームページ制作・SEO・DXの伴走パートナー",
  tagline: "ホームページ制作・SEO・DXを、小さく始めて続けられる形で",
  description:
    "スタークラボ（Stark Lab）は、ホームページ制作、SEO・MEO、保守運用、業務システム・AI活用まで伴走するWebパートナーです。建設業の現場課題にも強い一方、店舗・士業・製造・サービス業など業種を問わず全国対応しています。",
  seoTitle:
    "スタークラボ（Stark Lab）｜ホームページ制作・SEO・MEO・DX支援（全国対応）",
  seoDescription:
    "ホームページ制作、SEO・MEO、保守運用、業務システム・AI活用まで。建設業をはじめ、店舗・士業・製造・サービス業など全国対応。滋賀拠点・オンライン完結のご相談も可能です。",
  coverage: "全国対応",
  coverageNote:
    "オンラインで全国の企業・店舗様をご支援しています。拠点は滋賀県ですが、対応エリアに制限はありません。",
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
    id: "homepage",
    title: "ホームページ制作",
    description:
      "業種や規模に合わせ、問い合わせにつながる構成・文章・デザインでコーポレートサイトを制作します。",
  },
  {
    id: "seo",
    title: "SEO対策",
    description:
      "検索されやすい基本設計、記事・内部リンク、改善サイクルまで。地域名・業種名での見つけやすさを高めます。",
  },
  {
    id: "meo",
    title: "MEO対策",
    description:
      "Googleビジネスプロフィールの整備と運用で、近隣エリアからの問い合わせを後押しします。",
  },
  {
    id: "maintenance",
    title: "保守・運用",
    description:
      "公開後の更新、表示速度、セキュリティまで継続サポート。更新しやすい体制を一緒に整えます。",
  },
  {
    id: "kensapo",
    title: "KenSapo",
    description:
      "現場・写真・工程・日報をまとめる現場管理。建設業向けですが、現場写真の共有が必要な業種にも活用できます。",
  },
  {
    id: "drawstock",
    title: "DrawStock",
    description:
      "図面・PDFの共有・検索・権限管理。建設・設備系に加え、図面や資料管理が必要な現場向けです。",
  },
  {
    id: "ai",
    title: "AI活用",
    description:
      "問い合わせ対応、資料作成、社内業務の効率化など、現場に合ったAI活用を一緒に設計します。",
  },
] as const;

/** 対応業種（建設業に強みつつ、他業種も歓迎） */
export const industries = [
  "建設・土木・リフォーム",
  "設備・電気・空調",
  "製造・メーカー",
  "店舗・飲食・小売",
  "士業・コンサル",
  "医療・福祉",
  "IT・SaaS",
  "その他サービス業",
] as const;

/** ホームページFAQ（SEO・問い合わせ前の不安解消） */
export const homeFaq = [
  {
    question: "建設業以外でも相談できますか？",
    answer:
      "はい。店舗・士業・製造・サービス業など、業種を問わずご相談いただけます。建設業向けの現場管理・図面管理の知見も、必要に応じて活かします。",
  },
  {
    question: "ホームページ制作だけの依頼も可能ですか？",
    answer:
      "可能です。新規制作、リニューアル、LP追加、問い合わせ導線の改善など、範囲に合わせてご提案します。",
  },
  {
    question: "SEO・MEOはどこまで対応しますか？",
    answer:
      "サイトの基本設計、タイトル・説明文、内部リンク、記事運用の設計まで対応します。Googleビジネスプロフィールの整備（MEO）もご相談ください。",
  },
  {
    question: "対応エリアはどこですか？",
    answer:
      "全国対応です。オンラインでの打合せ・納品が中心で、拠点は滋賀県にあります。",
  },
  {
    question: "料金の目安を教えてください。",
    answer:
      "サイト規模・更新頻度・SEO/MEOの範囲によって異なります。まずは無料相談で課題を整理し、必要な範囲だけお見積りします。",
  },
] as const;

/** 問い合わせの相談種別 */
export const contactTopics = [
  { value: "homepage", label: "ホームページ制作について" },
  { value: "seo-meo", label: "SEO・MEOについて" },
  { value: "maintenance", label: "保守・運用について" },
  { value: "kensapo", label: "KenSapo（現場管理）について" },
  { value: "drawstock", label: "DrawStock（図面管理）について" },
  { value: "ai", label: "AI活用について" },
  { value: "other", label: "その他・まとめて相談" },
] as const;

export const navLinks = [
  { href: "/#services", label: "サービス" },
  { href: "/#projects", label: "Projects" },
  { href: "/works", label: "Works" },
  { href: "/media", label: "Media" },
  { href: "/areas", label: "対応エリア" },
  { href: "/#contact", label: "お問い合わせ" },
] as const;

export function formatYen(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount);
}
