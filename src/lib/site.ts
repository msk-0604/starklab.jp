/**
 * Stark Lab サイト設定
 * 所在地・電話番号など、後から編集する項目はここを更新してください。
 */
export const siteConfig = {
  name: "Stark Lab",
  tagline: "初期費用0円。月額22,000円でホームページ制作。",
  description:
    "制作・公開・保守・更新まで全てお任せ。中小企業・個人事業主向けの定額ホームページ制作サービスです。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://starklab.jp",
  owner: "山本 真樹",
  email: "yamamasaki0604@icloud.com",
  /** 後から編集してください */
  address: "※準備中（後から編集してください）",
  /** 後から編集してください */
  phone: "※準備中（後から編集してください）",
  pricing: {
    initial: 0,
    monthly: 22000,
    currency: "JPY" as const,
  },
  paymentMethod: "クレジットカード（Stripe）",
} as const;

export const services = [
  { title: "ホームページ制作", description: "業種に合わせたデザインで制作します" },
  { title: "スマホ対応", description: "全ページをレスポンシブ対応" },
  { title: "お問い合わせフォーム", description: "集客につながるフォームを設置" },
  { title: "SSL対応", description: "安全なHTTPS通信を標準装備" },
  { title: "SEO基本設定", description: "検索エンジン向けの基本設定" },
  { title: "保守管理", description: "公開後の安定運用をサポート" },
  { title: "更新サポート", description: "テキストや画像の更新に対応" },
  { title: "高速表示", description: "表示速度を重視した構成" },
  { title: "サーバー管理", description: "サーバーの運用管理を代行" },
  { title: "ドメイン管理", description: "ドメインの取得・管理もお任せ" },
] as const;

export const pricingIncludes = [
  "ホームページ制作",
  "サーバー管理",
  "ドメイン管理",
  "SSL",
  "保守",
  "更新対応",
  "バックアップ",
  "スマホ対応",
] as const;

export const processSteps = [
  { step: 1, title: "お問い合わせ", description: "フォームまたはメールでご連絡ください" },
  { step: 2, title: "ヒアリング", description: "ご要望・業種・目標を丁寧にお伺いします" },
  { step: 3, title: "デザイン・制作", description: "構成からデザイン、コーディングまで制作" },
  { step: 4, title: "公開", description: "内容をご確認のうえ、サイトを公開します" },
  { step: 5, title: "運用・保守開始", description: "更新・保守を継続的にサポートします" },
] as const;

export const faqs = [
  {
    question: "初期費用は本当に0円ですか？",
    answer: "はい。初期費用はいただいておりません。",
  },
  {
    question: "更新もお願いできますか？",
    answer: "はい。更新対応も月額料金に含まれています。",
  },
  {
    question: "スマホ対応していますか？",
    answer: "全ページ標準対応です。",
  },
  {
    question: "SEO対策はありますか？",
    answer: "基本的なSEO設定を行います。",
  },
] as const;

export const navLinks = [
  { href: "/#services", label: "サービス" },
  { href: "/#pricing", label: "料金" },
  { href: "/#process", label: "制作の流れ" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "お問い合わせ" },
] as const;

export function formatYen(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount);
}
