/**
 * 業種別SEOページ用の設計メモ（薄いページ量産はしない）。
 * 固有の検索意図・課題・提供内容を書ける業種だけ、将来 /industries/[slug] を追加する。
 */

export type IndustryPageDraft = {
  slug: string;
  name: string;
  /** 固有の検索意図があるか。false ならページ化しない */
  hasDistinctIntent: boolean;
  intentNote: string;
};

/** 候補。hasDistinctIntent=true かつコンテンツ準備後にのみルート化すること */
export const industryPageCandidates: IndustryPageDraft[] = [
  {
    slug: "construction",
    name: "建設業",
    hasDistinctIntent: true,
    intentNote: "KenSapo / DrawStock / 現場DXとの接続が明確",
  },
  {
    slug: "manufacturing",
    name: "製造業",
    hasDistinctIntent: false,
    intentNote: "固有事例・コピーが揃うまで保留",
  },
  {
    slug: "real-estate",
    name: "不動産",
    hasDistinctIntent: false,
    intentNote: "固有事例・コピーが揃うまで保留",
  },
  {
    slug: "food",
    name: "飲食",
    hasDistinctIntent: false,
    intentNote: "固有事例・コピーが揃うまで保留",
  },
  {
    slug: "beauty",
    name: "美容",
    hasDistinctIntent: false,
    intentNote: "固有事例・コピーが揃うまで保留",
  },
  {
    slug: "professional",
    name: "士業",
    hasDistinctIntent: false,
    intentNote: "固有事例・コピーが揃うまで保留",
  },
  {
    slug: "healthcare",
    name: "医療・介護",
    hasDistinctIntent: false,
    intentNote: "固有事例・コピーが揃うまで保留",
  },
  {
    slug: "sme",
    name: "中小企業",
    hasDistinctIntent: false,
    intentNote: "汎用すぎるため個別ページ化しない",
  },
];
