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
  /** カバー画像（public 配下）。未設定時はブランドパネルを表示 */
  coverImage?: string | null;
  /** 正式ブランドロゴ（改変せず表示） */
  brandLogo?: string | null;
  /** デスクトップ画面キャプチャ（正式素材がある場合のみ） */
  desktopImages?: string[];
  /** スマホ画面キャプチャ（正式素材がある場合のみ） */
  mobileImages?: string[];
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
    title: "KENBEI（ケンベイ）",
    category: "自社開発サービス",
    description:
      "建設会社の現場監督・施工管理者向けに、現場写真・タスク・進捗・日報PDFを一元管理するWebサービス。Stark Labが自社開発・運営しています（顧客への導入事例ではありません）。",
    tags: ["自社サービス", "現場管理", "Webブラウザ", "施工管理"],
    cta: {
      label: "KENBEIの詳細を見る",
      href: "https://app.kenbei.jp",
    },
    secondaryCta: {
      label: "14日間無料で試す",
      href: "https://app.kenbei.jp/signup",
    },
    coverImage: null,
    brandLogo: "/works/kenbei/logo.png",
    desktopImages: [],
    mobileImages: [],
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
      note: "まず14日間無料でKENBEIを試せます（カード登録不要の無料体験）。恒久無料プランはありません。有料プランは会社単位の月額料金です。",
      plans: [
        {
          name: "14日間無料体験",
          price: "無料",
          detail: "まず14日間無料でKENBEIを試せる",
        },
        {
          name: "STANDARD",
          price: "月額 39,800円",
          detail: "50名まで",
        },
        {
          name: "BUSINESS",
          price: "月額 65,000円",
          detail: "人数上限なし",
        },
      ],
    },
    overview:
      "KENBEI（ケンベイ）は、残業につながる事務作業を減らすためにStark Labが自社開発・運営する現場管理Webサービスです。建設会社の現場監督・施工管理者向けに、現場写真・タスク・進捗・日報PDFを一元管理します。顧客企業への導入事例ではなく、自社プロダクトです。公式アプリは app.kenbei.jp です。",
    background:
      "建設・施工の現場では、写真・残作業・進捗・日報がツールや紙に分断され、帰宅後の事務や確認作業が残業になりがちです。KENBEIは「現場の記録から、会社の事務まで。」を価値の中心に、同じ流れで管理できるWebサービスとしてStark Labが企画・開発・運営しています。",
    challenges: [
      "現場写真・残作業・進捗・日報がツールごとに分断されている",
      "現場の記録が会社の事務・日報作成までつながっておらず、残業が増える",
      "確認漏れや引き継ぎコストが発生しやすい",
    ],
    proposal: [
      "写真 → タスク・残作業 → 進捗 → 日報 → PDF の一連の流れで管理する現場管理Webとして企画",
      "残業につながる事務作業を減らす体験を優先する",
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
    highlights: ["残業につながる事務を削減", "写真から日報まで", "残作業・進捗", "14日無料体験"],
    relatedSlugs: [],
    seo: {
      title: "KENBEI（ケンベイ）｜残業を減らす現場管理｜Stark Lab",
      description:
        "残業につながる事務を減らす建設会社向け現場管理Web「KENBEI」。写真・残作業・日報を一本化。14日間無料体験、STANDARD月額39,800円（50名まで）、BUSINESS月額65,000円。",
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
