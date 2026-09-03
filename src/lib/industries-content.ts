/**
 * 業種別ソリューションページ定義
 */

export type IndustryDefinition = {
  slug: string;
  name: string;
  seo: { title: string; description: string };
  summary: string;
  whatIs: string;
  challenges: string[];
  useCases: string[];
  serviceSlugs: string[];
  implementationNotes: string[];
  workSlugs: string[];
  mediaKeywords: string[];
  faqs: { question: string; answer: string }[];
  ctaLabel: string;
  contactTopic: string;
  /** 実装済み / 対応可能 / 構想 — 表現の区別用メモ（ページ本文に反映） */
  capabilityNotes: string[];
};

export const industryDefinitions: IndustryDefinition[] = [
  {
    slug: "construction",
    name: "建設業",
    seo: {
      title: "建設業DX・現場管理",
      description:
        "建設業向けDX。現場管理、日報、写真、図面、工程、見積、安全書類、RAG、AI報告書、Dashboard。KenSapo・DrawStockの実績を活用。",
    },
    summary:
      "建設現場の情報をクラウドでつなぎ、現場管理・図面・日報・報告を一気通貫で改善する建設業DXを支援します。",
    whatIs:
      "Construction DXは、建設・工務・施工会社の現場と事務所に散らばる情報を、Web・システム・AIでつなぎ、確認漏れと手戻りを減らす取り組みです。",
    challenges: [
      "現場写真・工程・日報がツールごとに分断されている",
      "図面の版管理と共有に時間がかかる",
      "報告書・安全書類の作成が属人化している",
      "現場と本社で見ている情報が一致しない",
    ],
    useCases: [
      "クラウド現場管理（現場・写真・工程・日報・通知）",
      "図面・PDFの共有・検索・権限管理",
      "日報・報告書の入力効率化とAIたたき台",
      "社内ナレッジ（安全資料・過去案件）の検索",
      "案件・工程のDashboard可視化",
    ],
    serviceSlugs: [
      "system-development",
      "ai-automation",
      "rag",
      "data-dashboard",
      "web-development",
      "seo-ai-search",
    ],
    implementationNotes: [
      "【実装済み】KenSapo（現場管理システム）— 現場・写真・工程・日報をクラウド集約",
      "【実装済み】DrawStock（図面管理）— 図面・PDFの版管理と検索",
      "【対応可能】日報・報告書のAI支援、RAGによる安全資料検索",
      "【対応可能】工程・案件のDashboard、Web集客とメディア連携",
    ],
    workSlugs: ["kensapo", "drawstock"],
    mediaKeywords: ["建設", "現場", "施工", "工事", "KenSapo", "図面"],
    faqs: [
      {
        question: "建設業向けの実績はありますか？",
        answer:
          "KenSapo（現場管理）とDrawStock（図面管理）を自社開発・運用しています。詳細は制作実績ページをご覧ください。",
      },
      {
        question: "小規模の工務店でも導入できますか？",
        answer: "可能です。現場数・業務範囲に合わせて段階導入を提案します。",
      },
    ],
    ctaLabel: "建設業DXについて相談",
    contactTopic: "industry-construction",
    capabilityNotes: [],
  },
  {
    slug: "manufacturing",
    name: "製造業",
    seo: {
      title: "製造業DX・ナレッジAI",
      description:
        "製造業向けDX。技術資料RAG、マニュアル検索、図面情報、品質・設備情報、Dashboard、AI Agent。対応可能領域と実績を区別してご案内。",
    },
    summary:
      "製造業の技術資料・マニュアル・図面・品質情報を整理し、RAG・Dashboard・AI Agentで現場と管理部門の生産性を高めます。",
    whatIs:
      "Manufacturing DXは、製造業に蓄積された技術資料・作業手順・品質情報を、検索・可視化・自動化できる形に整える取り組みです。",
    challenges: [
      "技術資料・マニュアルが分散し、必要な情報にたどり着けない",
      "ベテランの知識が属人化している",
      "品質・設備・生産データが部門ごとに分断されている",
      "AI導入の優先順位が分からない",
    ],
    useCases: [
      "技術資料・マニュアルのRAG検索",
      "図面・PDFライブラリと連携するナレッジ検索",
      "品質・設備・生産情報のDashboard",
      "問い合わせ・報告業務のAI自動化",
      "AI Agentによる定型フローの半自動化",
    ],
    serviceSlugs: [
      "rag",
      "ai-agent",
      "data-dashboard",
      "system-development",
      "ai-automation",
      "dx-consulting",
    ],
    implementationNotes: [
      "【実装済み】DrawStock — 図面・PDFのクラウド管理・検索（建設・製造の図面管理に応用可能）",
      "【対応可能】技術資料RAG、マニュアル検索、作業手順のナレッジ化",
      "【対応可能】生産・品質・設備データのDashboard設計",
      "【構想・要件次第】BOM連携、マルチモーダルAI — 要件ヒアリング後に実現性を評価します",
    ],
    workSlugs: ["drawstock"],
    mediaKeywords: ["製造", "工場", "図面", "マニュアル", "RAG"],
    faqs: [
      {
        question: "製造業でもAIを導入できますか？",
        answer:
          "可能です。まずは資料の整理とRAG、Dashboardなど、効果が見えやすい領域から段階導入を推奨します。",
      },
      {
        question: "未実装の技術を実績として謳っていますか？",
        answer:
          "いいえ。実装済み・対応可能・要件次第の構想を分けてご案内します。",
      },
    ],
    ctaLabel: "製造業DXについて相談",
    contactTopic: "industry-manufacturing",
    capabilityNotes: [],
  },
  {
    slug: "small-business",
    name: "中小企業",
    seo: {
      title: "中小企業DX",
      description:
        "中小企業向けDX。Excel・紙・メール業務の整理、顧客管理、見積、AI自動化、社内情報の整備。小さく始めるDX支援。",
    },
    summary:
      "Excel・紙・メールに散らばった業務を、Web・システム・AIで少しずつ整え、中小企業でも無理なくDXを進めます。",
    whatIs:
      "Small Business DXは、人手と属人化に依存している業務を、規模に合ったシステム・AIで改善する取り組みです。",
    challenges: [
      "Excelと紙が増え続け、誰も全体像を把握できない",
      "見積・顧客・営業情報が個人の管理に依存している",
      "IT担当がおらず、何から手を付けるか分からない",
      "大規模DXは予算・時間が合わない",
    ],
    useCases: [
      "顧客・見積・営業管理のシステム化",
      "定型メール・報告のAI自動化",
      "社内FAQ・ナレッジの整備",
      "Webサイトと問い合わせ導線の改善",
      "小さなDashboardで経営指標を可視化",
    ],
    serviceSlugs: [
      "dx-consulting",
      "system-development",
      "ai-automation",
      "web-development",
      "data-dashboard",
    ],
    implementationNotes: [
      "【対応可能】1業務からのシステム化・AI PoC",
      "【対応可能】Web制作と問い合わせ導線の改善",
      "段階導入を前提に、ROIが見える範囲から設計します",
    ],
    workSlugs: ["stark-lab"],
    mediaKeywords: ["中小", "Excel", "業務", "効率化"],
    faqs: [
      {
        question: "小規模企業でも導入できますか？",
        answer: "可能です。まず1業務・1画面から始める設計を推奨しています。",
      },
      {
        question: "Web制作だけ依頼できますか？",
        answer: "可能です。システム・AIと組み合わせる場合も同じチームで支援します。",
      },
    ],
    ctaLabel: "中小企業DXについて相談",
    contactTopic: "industry-small-business",
    capabilityNotes: [],
  },
  {
    slug: "real-estate",
    name: "不動産業",
    seo: {
      title: "不動産業DX",
      description:
        "不動産業向けDX。物件情報、顧客管理、営業支援、問い合わせ、文書生成、Web集客、SEO。",
    },
    summary:
      "物件・顧客・営業情報を整理し、Web集客・問い合わせ対応・文書作成を効率化する不動産業向けDXを支援します。",
    whatIs:
      "Real Estate DXは、不動産・賃貸・仲介業の物件情報と顧客対応を、Web・システム・AIでつなぎ、営業と集客を支える取り組みです。",
    challenges: [
      "物件情報と顧客情報がツールや個人に分散している",
      "問い合わせ対応と資料作成に時間がかかる",
      "Webからの集客と社内管理がつながっていない",
      "営業メンバーごとにやり方が異なる",
    ],
    useCases: [
      "物件・顧客管理システム",
      "問い合わせ対応の整理とAI支援",
      "内見・提案資料の文書生成支援",
      "Web集客・SEO・LP改善",
      "営業進捗のDashboard",
    ],
    serviceSlugs: [
      "web-development",
      "seo-ai-search",
      "system-development",
      "ai-automation",
      "data-dashboard",
    ],
    implementationNotes: [
      "【対応可能】物件・顧客管理の設計・開発",
      "【対応可能】Web集客、SEO、問い合わせ導線の改善",
      "業種固有の実績ページは準備中。要件ヒアリングのうえ設計します",
    ],
    workSlugs: [],
    mediaKeywords: ["不動産", "物件", "Web", "集客"],
    faqs: [
      {
        question: "不動産業向けのパッケージはありますか？",
        answer:
          "固定パッケージではなく、物件管理・集客・問い合わせなど課題に合わせて設計します。",
      },
      {
        question: "Web制作とシステムを同時に依頼できますか？",
        answer: "可能です。Stark Labの強みである一体設計で進めます。",
      },
    ],
    ctaLabel: "不動産業DXについて相談",
    contactTopic: "industry-real-estate",
    capabilityNotes: [],
  },
  {
    slug: "service-business",
    name: "店舗・サービス業",
    seo: {
      title: "店舗・サービス業DX",
      description:
        "店舗・サービス業向けDX。Web集客、SEO、予約・問い合わせ、顧客管理、FAQ AI、データ分析、業務自動化。",
    },
    summary:
      "店舗・サービス業のWeb集客、問い合わせ、顧客管理、FAQ対応をWeb・AI・データで改善します。",
    whatIs:
      "Service Business DXは、来店・問い合わせ・予約・顧客フォローを、Webとデジタルツールでつなぎ、集客と運用を支える取り組みです。",
    challenges: [
      "Webからの問い合わせが増えても対応が追いつかない",
      "MEO・SEOの施策が点で止まっている",
      "顧客情報がバラバラでリピート施策が弱い",
      "FAQ・問い合わせが電話とメールに集中している",
    ],
    useCases: [
      "サービスサイト・LP制作とCV改善",
      "SEO・MEO・コンテンツ運用",
      "FAQ AI・問い合わせ整理",
      "顧客・予約管理のシステム化",
      "問い合わせ・流入のDashboard",
    ],
    serviceSlugs: [
      "web-development",
      "seo-ai-search",
      "ai-automation",
      "system-development",
      "data-dashboard",
    ],
    implementationNotes: [
      "【対応可能】Web制作、SEO、問い合わせ導線、FAQ AI",
      "【対応可能】MEO（Googleビジネスプロフィール）の整備支援",
      "店舗数・業態に合わせて段階導入を設計します",
    ],
    workSlugs: ["stark-lab"],
    mediaKeywords: ["店舗", "サービス", "SEO", "集客", "MEO"],
    faqs: [
      {
        question: "Web制作とSEOをセットで依頼できますか？",
        answer: "可能です。公開時から計測・SEO・CV導線を一体で設計します。",
      },
      {
        question: "AIで問い合わせ対応を効率化できますか？",
        answer:
          "FAQ整備とAI支援で、一次対応の効率化は可能です。最終確認は人が行う設計を推奨します。",
      },
    ],
    ctaLabel: "サービス業DXについて相談",
    contactTopic: "industry-service-business",
    capabilityNotes: [],
  },
];

export function getAllIndustries(): IndustryDefinition[] {
  return industryDefinitions;
}

export function getIndustryBySlug(slug: string): IndustryDefinition | undefined {
  return industryDefinitions.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industryDefinitions.map((i) => i.slug);
}
