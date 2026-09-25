/**
 * Stark Lab サイト設定
 * ※ 所在地・電話番号は特定商取引法に基づく表記ページのみで使用します。
 */
export const siteConfig = {
  name: "Stark Lab",
  nameJa: "スタークラボ",
  concept: "現場管理Webサービス KENBEI を自社開発・運営",
  tagline: "現場管理サービス KENBEI を、自社で開発・運営しています",
  description:
    "Stark Lab（スタークラボ）は、建設現場向け現場管理Webサービス「KENBEI（ケンベイ）」を自社開発・運営しています。拠点は滋賀県。打合せはオンライン完結です。",
  seoTitle:
    "スタークラボ（Stark Lab）｜KENBEI（ケンベイ）運営",
  seoDescription:
    "Stark Lab（スタークラボ／すたーくらぼ）は、現場管理WebサービスKENBEIを自社開発・運営。14日間無料体験あり。建設会社の現場監督・施工管理者向け。公式アプリは app.kenbei.jp。",
  entityStatement:
    "Stark Lab（スタークラボ／すたーくらぼ）は、現場管理WebサービスKENBEIを自社開発・運営しています。",
  /** ブランド検索・構造化データ用の別名 */
  brandAliases: [
    "スタークラボ",
    "すたーくらぼ",
    "Stark Lab",
    "StarkLab",
    "STARK LAB",
    "スターク ラボ",
  ] as const,
  coverage: "全国対応",
  coverageNote:
    "日本全国どこでも対応します。打合せ・納品はオンライン完結です。拠点は滋賀県ですが、エリアによる制限はありません。",
  location: "滋賀県",
  responseNote: "2営業日以内を目安にご返信します",
  /** 本番正規URL（www）。sitemap / canonical / JSON-LD で使用 */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.starklab.jp",
  owner: "山本 真樹",
  /** 公開連絡先（サイト・特商法・JSON-LD 表示用） */
  email: "contact@starklab.jp",
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

/** 旧コンポーネント互換 — 8本柱へのマッピング表示用 */
export const offerings = [
  {
    id: "web",
    title: "Web Development",
    description: "コーポレート・LP・SEO・CV・AI検索を意識したサイト制作",
  },
  {
    id: "system",
    title: "System Development",
    description: "顧客・案件・工程・図面など、業務に合わせたシステム開発",
  },
  {
    id: "ai-auto",
    title: "AI Automation",
    description: "問い合わせ・文書・定型業務のAI自動化",
  },
  {
    id: "ai-agent",
    title: "AI Agent",
    description: "LLM + API + DB + Workflow の業務AIエージェント",
  },
  {
    id: "rag",
    title: "RAG / Knowledge AI",
    description: "社内資料・図面・マニュアルのナレッジ検索",
  },
  {
    id: "data",
    title: "Data / Dashboard",
    description: "KPI・案件・生産データの可視化と意思決定支援",
  },
  {
    id: "seo",
    title: "SEO / AI Search",
    description: "検索・AI検索・コンテンツ・CVを統合した成長基盤",
  },
  {
    id: "dx",
    title: "DX Consulting",
    description: "業務整理からPoC・開発・改善までの伴走",
  },
] as const;

/** 対応業種（ナビ・Entity用） */
export const industries = [
  "建設・設備",
  "製造・メーカー",
  "不動産",
  "中小企業",
  "店舗・サービス業",
  "士業・コンサル",
  "医療・福祉",
  "IT・SaaS",
] as const;

export const homeFaq = [
  {
    question: "スタークラボ（Stark Lab）とはどのような会社ですか？",
    answer:
      "Stark Lab（スタークラボ／すたーくらぼ）は、現場管理WebサービスKENBEIを自社開発・運営しています。公式サイトは https://www.starklab.jp です。",
  },
  {
    question: "Stark Labとスタークラボは同じですか？読み方は？",
    answer:
      "同じ運営です。正式名称は Stark Lab、日本語表記はスタークラボ、読みは「すたーくらぼ」です。運営責任者は山本 真樹、お問い合わせは contact@starklab.jp です。",
  },
  {
    question: "KENBEI（ケンベイ）とは何ですか？",
    answer:
      "KENBEIはStark Labが自社開発・運営する現場管理Webサービスです。建設会社の現場監督・施工管理者向けに、現場写真・タスク・進捗・日報PDFを一元管理します。顧客への導入事例ではなく自社プロダクトで、公式アプリは https://app.kenbei.jp です。",
  },
  {
    question: "KENBEIの料金はいくらですか？",
    answer:
      "14日間の無料体験があります（恒久無料プランはありません）。有料は会社単位で、STANDARDが月額39,800円（50名まで）、BUSINESSが月額65,000円（人数上限なし）です。詳細は https://www.starklab.jp/works/kenbei および https://app.kenbei.jp をご確認ください。",
  },
  {
    question: "対応エリアはどこですか？",
    answer:
      "日本全国どこでも対応します。打合せはオンライン完結です。拠点は滋賀県大津市にあります。",
  },
] as const;

/** 問い合わせの相談種別 */
export const contactTopics = [
  { value: "web-development", label: "Web制作について" },
  { value: "system-development", label: "業務システム・開発について" },
  { value: "ai-automation", label: "AI自動化について" },
  { value: "ai-agent", label: "AIエージェント導入について" },
  { value: "rag", label: "RAG・ナレッジAIについて" },
  { value: "data-dashboard", label: "データ・Dashboardについて" },
  { value: "seo-ai-search", label: "検索・AI流入・SEOについて" },
  { value: "dx-consulting", label: "DXコンサルについて" },
  { value: "industry-construction", label: "建設業DXについて" },
  { value: "industry-manufacturing", label: "製造業DXについて" },
  { value: "industry-small-business", label: "中小企業DXについて" },
  { value: "industry-real-estate", label: "不動産業DXについて" },
  { value: "industry-service-business", label: "店舗・サービス業DXについて" },
  { value: "kenbei", label: "KENBEI（現場管理）について" },
  { value: "drawstock", label: "DrawStock（図面管理）について" },
  { value: "other", label: "その他・まとめて相談" },
] as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export function formatYen(amount: number): string {
  return new Intl.NumberFormat("ja-JP").format(amount);
}
