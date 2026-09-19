/**
 * 制作実績データ
 * 新規案件は配列にオブジェクトを追加するだけで一覧・詳細・sitemapに反映されます。
 *
 * Case Study 流れ: 課題 → 提案 → 設計 → 実装 → 成果(任意・捏造禁止)
 */

export type ProjectCta = {
  label: string;
  /** 外部URLまたはサイト内パス。未設定の場合は詳細ページ内のCTAのみ表示 */
  href?: string;
};

export type ProjectPricingPlan = {
  name: string;
  price: string;
  detail?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** カード用の短い説明 */
  description: string;
  tags: string[];
  cta: ProjectCta;
  /** 追加CTA（任意） */
  secondaryCta?: ProjectCta;
  /** カバー画像（public 配下） */
  coverImage: string;
  /** デスクトップ画面キャプチャ */
  desktopImages: string[];
  /** スマホ画面キャプチャ */
  mobileImages: string[];
  /** 機能一覧（システム系案件向け） */
  features?: string[];
  /** 料金プラン（会社単位の月額など） */
  pricing?: {
    heading?: string;
    note?: string;
    plans: ProjectPricingPlan[];
  };
  overview: string;
  background: string;
  /** 課題 */
  challenges: string[];
  /** 提案 */
  proposal: string[];
  /** 設計 */
  design: string[];
  /** 実装 */
  implementation: string[];
  /**
   * 成果（数値・顧客名の捏造禁止。実測がある場合のみ記載）
   */
  outcomes?: string[];
  /** @deprecated 互換: implementation と同義 */
  improvements: string[];
  /** 対応ポイント（技術名ではなく価値で表現） */
  highlights: string[];
  /** 関連実績の slug */
  relatedSlugs: string[];
  seo: {
    title: string;
    description: string;
  };
};

export const projects: Project[] = [
  {
    slug: "kenbei",
    title: "KENBEI",
    category: "現場管理システム",
    description:
      "現場の記録から、会社の事務まで。写真・残作業・進捗・日報を、ひとつの流れで管理。",
    tags: ["クラウド", "現場管理", "Webブラウザ", "施工管理"],
    cta: {
      label: "KENBEIを見る",
      href: "https://app.kenbei.jp",
    },
    secondaryCta: {
      label: "14日間無料で始める",
      href: "https://app.kenbei.jp/signup",
    },
    coverImage: "/works/kenbei/cover.jpg",
    desktopImages: ["/works/kenbei/desktop.svg"],
    mobileImages: ["/works/kenbei/mobile.svg"],
    features: [
      "現場管理",
      "写真管理",
      "写真からタスク/残作業管理",
      "進捗管理",
      "日報作成",
      "日報PDF",
      "AI軍師による業務補助",
      "メンバー管理",
      "Webブラウザ対応",
    ],
    pricing: {
      heading: "料金",
      note: "まず14日間無料でKENBEIを試せます。有料プランは会社単位の月額料金です。",
      plans: [
        {
          name: "14日間無料体験",
          price: "無料",
          detail: "まず14日間無料でKENBEIを試せる",
        },
        { name: "STANDARD", price: "月額 39,800円" },
        { name: "BUSINESS", price: "月額 65,000円" },
      ],
    },
    overview:
      "KENBEIは、施工管理の現場で発生する写真・タスク・進捗・日報をつなげて管理する現場管理Webサービスです。現場写真からタスク・残作業、進捗管理、日報、PDFまでを同じ流れで扱い、現場の記録を会社の事務につなげます。",
    background:
      "建設・施工の現場では、写真・残作業・進捗・日報がツールや紙に分断されがちです。KENBEIは「現場の記録から、会社の事務まで。」を価値の中心に、同じ流れで管理できるWeb SaaSとして設計しました。",
    challenges: [
      "現場写真・残作業・進捗・日報がツールごとに分断されている",
      "現場の記録が会社の事務・日報作成までつながっていない",
      "確認漏れや引き継ぎコストが発生しやすい",
    ],
    proposal: [
      "写真 → タスク・残作業 → 進捗 → 日報 → PDF の一連の流れで管理する現場管理Webとして企画",
      "AIだけを主役にせず、現場記録から事務までをつなぐ体験を優先する",
      "Webブラウザで利用できるクラウド運用を前提にする",
    ],
    design: [
      "現場単位で写真・残作業・進捗・日報を横断できる情報設計",
      "日報作成とPDF出力までを一連の導線として設計",
      "メンバー管理と役割に応じた運用を想定した画面構成",
    ],
    implementation: [
      "現場写真からタスク・残作業・進捗・日報までをつなぐ画面構成",
      "日報作成と日報PDFの出力フロー",
      "AI軍師による業務補助（記録・事務の補助として配置）",
      "メンバー管理とWebブラウザ対応のクラウド基盤",
    ],
    improvements: [
      "現場写真からタスク・残作業・進捗・日報までをつなぐ画面構成",
      "日報作成と日報PDFの出力フロー",
      "AI軍師による業務補助（記録・事務の補助として配置）",
      "メンバー管理とWebブラウザ対応のクラウド基盤",
    ],
    highlights: ["写真から日報まで", "進捗・残作業", "日報PDF", "Webブラウザ"],
    relatedSlugs: ["drawstock", "stark-lab"],
    seo: {
      title: "KENBEI｜施工管理・現場管理",
      description:
        "現場写真・タスク・進捗・日報をひとつの流れで管理する施工管理Webサービス「KENBEI」。現場の記録から、会社の事務まで。",
    },
  },
  {
    slug: "drawstock",
    title: "DrawStock",
    category: "図面管理システム",
    description:
      "建設業向けクラウド図面管理システム。図面共有・PDF管理・検索・権限管理をクラウドで実現。",
    tags: ["クラウド", "図面管理", "権限管理"],
    cta: {
      label: "詳しく見る",
    },
    coverImage: "/works/drawstock/cover.jpg",
    desktopImages: ["/works/drawstock/desktop.svg"],
    mobileImages: ["/works/drawstock/mobile.svg"],
    features: ["図面共有", "PDF管理", "検索", "権限管理"],
    overview:
      "図面・PDFをクラウド上で安全に共有・検索できる図面管理システムです。最新版の取り違えを防ぎ、現場と設計・管理側が同じ図面を参照できる環境を提供します。",
    background:
      "図面はメール添付やローカルフォルダで共有されることが多く、版管理や閲覧権限の制御が課題になりやすい領域です。DrawStockは「正しい図面が、正しい人に、すぐ届く」ことを目指して設計しました。",
    challenges: [
      "図面の版が複数存在し、最新かどうか判断しづらい",
      "PDFの保管場所が分散し、必要な図面を探すのに時間がかかる",
      "社外パートナーへの共有範囲を細かく制御しづらい",
    ],
    proposal: [
      "図面・PDFをクラウドで共有・検索できる図面管理として企画",
      "版管理と権限を前提にしたライブラリ構成を提案",
      "プロジェクト単位で閲覧・ダウンロード範囲を制御する",
    ],
    design: [
      "アップロードと版管理を前提としたライブラリUX",
      "キーワード検索で目的図面へ到達できる情報設計",
      "社内外の共有範囲を分けられる権限モデル",
    ],
    implementation: [
      "図面・PDFのアップロードと版管理を前提としたライブラリ構成",
      "キーワード検索で目的の図面へ素早く到達できる体験",
      "権限管理により、閲覧・ダウンロード範囲をプロジェクト単位で制御",
      "安全に共有できるクラウド基盤を構築",
    ],
    improvements: [
      "図面・PDFのアップロードと版管理を前提としたライブラリ構成",
      "キーワード検索で目的の図面へ素早く到達できる体験",
      "権限管理により、閲覧・ダウンロード範囲をプロジェクト単位で制御",
      "安全に共有できるクラウド基盤を構築",
    ],
    highlights: ["図面共有", "PDF管理", "検索", "権限管理"],
    relatedSlugs: ["kenbei", "stark-lab"],
    seo: {
      title: "DrawStock｜建設業向け図面管理システム",
      description:
        "建設業向けクラウド図面管理システム DrawStock の制作実績。図面共有・PDF管理・検索・権限管理を実現したDX事例です。",
    },
  },
  {
    slug: "stark-lab",
    title: "Stark Lab",
    category: "自社ホームページ",
    description:
      "自社の公式サイト。Web・システム・AIの開発パートナーとしての情報設計と問い合わせ導線を実装。",
    tags: ["SEO", "ホームページ制作", "MEO"],
    cta: {
      label: "お問い合わせ",
      href: "/#contact",
    },
    coverImage: "/works/stark-lab/cover.jpg",
    desktopImages: ["/works/stark-lab/desktop.svg"],
    mobileImages: ["/works/stark-lab/mobile.svg"],
    overview:
      "Stark Lab の公式サイトです。Web制作・システム開発・AI活用の範囲と、問い合わせまでの流れを伝えています。",
    background:
      "何をしてくれるのかを最初の数秒で理解してもらう必要がありました。過剰な装飾を排し、品質と誠実さが伝わるブランドサイトを目指しました。",
    challenges: [
      "サービス範囲を、短時間で誤解なく伝える必要がある",
      "実績がこれから増える段階でも、品質への信頼をデザインで示す必要がある",
      "SEO・MEOを見据えた情報設計と、問い合わせまでの導線設計",
    ],
    proposal: [
      "サービス理解から問い合わせまでの一本導線としてサイトを再設計",
      "全国対応のITパートナーとして伝わる情報設計を提案",
      "SEO・計測基盤を最初から組み込む方針",
    ],
    design: [
      "ヒーローからFAQ・問い合わせまで一目で理解できる構成",
      "余白とタイポグラフィを活かしたミニマルUI",
      "スマホ最適化と高速表示を前提にしたレイアウト",
    ],
    implementation: [
      "ヒーローから流れ・FAQ・問い合わせまで、一目で理解できる情報設計",
      "余白とタイポグラフィを活かしたミニマルUIで、高級感と読みやすさを両立",
      "検索・SNS向けのSEO基盤を整備",
      "スマホ最適化と高速表示を前提とした実装",
    ],
    improvements: [
      "ヒーローから流れ・FAQ・問い合わせまで、一目で理解できる情報設計",
      "余白とタイポグラフィを活かしたミニマルUIで、高級感と読みやすさを両立",
      "検索・SNS向けのSEO基盤を整備",
      "スマホ最適化と高速表示を前提とした実装",
    ],
    highlights: ["SEO", "ホームページ制作", "MEO", "スマホ対応"],
    relatedSlugs: ["drawstock", "kenbei"],
    seo: {
      title: "自社ホームページ制作実績",
      description:
        "Stark Lab 自社サイトの制作実績。Web・システム・AIの開発パートナーとしてのブランドサイト事例です。",
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project): Project[] {
  return project.relatedSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p));
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}
