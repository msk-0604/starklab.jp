/**
 * Stark Lab サイト設定
 * ※ 所在地・電話番号は特定商取引法に基づく表記ページのみで使用します。
 */
export const siteConfig = {
  name: "Stark Lab",
  concept: "建設業に特化したホームページ制作・DXパートナー",
  tagline: "建設業に特化したホームページ制作・DXパートナー",
  description:
    "水道・設備・電気・建築など建設業に特化したホームページ制作、SEO・MEO、保守運用、現場管理・図面管理、AI活用までワンストップで支援。全国対応。",
  coverage: "全国対応",
  coverageNote:
    "オンラインで全国の建設会社様をご支援しています。拠点は滋賀県ですが、対応エリアに制限はありません。",
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
      "業種の強みと問い合わせ導線を設計した、建設業向けコーポレートサイト。",
  },
  {
    id: "seo",
    title: "SEO対策",
    description:
      "地域・業種キーワードで見つかるための基本設計と継続的な改善。",
  },
  {
    id: "meo",
    title: "MEO対策",
    description:
      "Googleビジネスプロフィールを整え、地域のお客様からの発見を後押し。",
  },
  {
    id: "maintenance",
    title: "保守・運用",
    description:
      "公開後の更新・セキュリティ・表示速度まで、運用を継続サポート。",
  },
  {
    id: "kensapo",
    title: "KenSapo",
    description:
      "現場・写真・工程・予定・日報・通知をまとめる建設業向け現場管理。",
  },
  {
    id: "drawstock",
    title: "DrawStock",
    description:
      "図面共有・PDF管理・検索・権限管理をクラウドで実現する図面管理。",
  },
  {
    id: "ai",
    title: "AI活用",
    description:
      "業務効率化やコンテンツ制作など、建設業の現場に合うAI活用を支援。",
  },
] as const;

/** ターゲット業種 */
export const industries = [
  "水道工事会社",
  "設備工事会社",
  "電気工事会社",
  "空調設備会社",
  "消防設備会社",
  "建築会社",
  "土木会社",
  "塗装会社",
  "リフォーム会社",
  "解体会社",
  "造園会社",
  "その他建設業",
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
  { href: "/areas", label: "対応エリア" },
  { href: "/#contact", label: "お問い合わせ" },
] as const;

export function formatYen(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount);
}
