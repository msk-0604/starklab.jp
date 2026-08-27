/**
 * 制作実績データ
 * 新規案件は配列にオブジェクトを追加するだけで一覧・詳細・sitemapに反映されます。
 */

export type ProjectCta = {
  label: string;
  /** 外部URL。未設定の場合は詳細ページ内のCTAのみ表示 */
  href?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** カード用の短い説明 */
  description: string;
  tags: string[];
  cta: ProjectCta;
  /** カバー画像（public 配下） */
  coverImage: string;
  /** デスクトップ画面キャプチャ */
  desktopImages: string[];
  /** スマホ画面キャプチャ */
  mobileImages: string[];
  /** 機能一覧（システム系案件向け） */
  features?: string[];
  overview: string;
  background: string;
  challenges: string[];
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
    slug: "kensapo",
    title: "KenSapo",
    category: "現場管理システム",
    description:
      "建設業向けクラウド現場管理システム。現場・写真・工程・予定・日報・通知をひとつの画面で。",
    tags: ["クラウド", "現場管理", "スマホ対応"],
    cta: {
      label: "詳しく見る",
    },
    coverImage: "/works/kensapo/cover.jpg",
    desktopImages: ["/works/kensapo/desktop.svg"],
    mobileImages: ["/works/kensapo/mobile.svg"],
    features: [
      "現場管理",
      "写真管理",
      "工程管理",
      "予定管理",
      "日報",
      "通知",
    ],
    overview:
      "建設現場の情報をクラウドに集約する現場管理システムです。紙やチャットに散らばりがちな現場情報を、権限付きでチーム全体が同じ画面から扱えるように設計しました。",
    background:
      "建設業では現場写真・工程表・日報が複数のツールに分散しやすく、確認漏れや引き継ぎコストが発生しがちです。現場と事務所をつなぐ「ひとつの正」をつくることが開発の目的でした。",
    challenges: [
      "現場・写真・工程・予定・日報がツールごとに分断されている",
      "スマホでの入力・確認がしづらく、現場での利用率が上がらない",
      "権限や通知の設計が弱く、関係者への情報共有が遅れる",
    ],
    improvements: [
      "現場単位で情報を集約し、写真・工程・予定・日報を横断して確認できる画面構成",
      "現場からの日報・写真投稿を簡単にした入力フロー",
      "役割に応じた権限管理と、重要イベントの通知機能を実装",
      "リアルタイム共有と、運用しやすいクラウド基盤を整備",
    ],
    highlights: ["クラウド運用", "権限管理", "スマホ対応", "リアルタイム共有"],
    relatedSlugs: ["drawstock", "stark-lab"],
    seo: {
      title: "KenSapo｜建設業向け現場管理システム",
      description:
        "建設業向けクラウド現場管理システム KenSapo の制作実績。現場管理・写真・工程・予定・日報・通知をまとめたDX事例です。",
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
    improvements: [
      "図面・PDFのアップロードと版管理を前提としたライブラリ構成",
      "キーワード検索で目的の図面へ素早く到達できる体験",
      "権限管理により、閲覧・ダウンロード範囲をプロジェクト単位で制御",
      "安全に共有できるクラウド基盤を構築",
    ],
    highlights: ["図面共有", "PDF管理", "検索", "権限管理"],
    relatedSlugs: ["kensapo", "stark-lab"],
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
    improvements: [
      "ヒーローから流れ・FAQ・問い合わせまで、一目で理解できる情報設計",
      "余白とタイポグラフィを活かしたミニマルUIで、高級感と読みやすさを両立",
      "検索・SNS向けのSEO基盤を整備",
      "スマホ最適化と高速表示を前提とした実装",
    ],
    highlights: ["SEO", "ホームページ制作", "MEO", "スマホ対応"],
    relatedSlugs: ["drawstock", "kensapo"],
    seo: {
      title: "Stark Lab｜自社ホームページ制作実績",
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
