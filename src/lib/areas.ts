/**
 * 地域ランディングページ用データ
 * 新規エリアは配列に追加するだけで一覧・詳細・sitemapに反映されます。
 */

export type Area = {
  slug: string;
  name: string;
  /** 例: 関西 / 中部 / 関東 */
  region: string;
  /** ページ用の短いリード文 */
  lead: string;
  /** 地域特有の訴求ポイント */
  highlights: string[];
  /** 地域内の主要都市（SEO・本文用。任意） */
  cities?: string[];
  seo: {
    title: string;
    description: string;
  };
};

export const areas: Area[] = [
  {
    slug: "shiga",
    name: "滋賀県",
    region: "関西",
    lead: "滋賀県の水道・設備・建築など建設会社様向けに、ホームページ制作からSEO・MEO、現場DXまでワンストップで支援します。",
    highlights: [
      "拠点のある滋賀県から、地元企業の集客と現場効率化を支援",
      "設備工事・水道工事など、地域密着業種の問い合わせ導線設計",
      "全国対応のノウハウを活かしつつ、近隣エリアの事情にも対応",
    ],
    cities: ["大津市", "草津市", "彦根市", "長浜市", "東近江市"],
    seo: {
      title: "滋賀県の建設業向けホームページ制作・DX｜Stark Lab",
      description:
        "滋賀県の水道工事・設備工事・建築会社向けホームページ制作、SEO・MEO、KenSapo・DrawStockなどのDX支援。全国対応のStark Lab。",
    },
  },
  {
    slug: "kyoto",
    name: "京都府",
    region: "関西",
    lead: "京都府の建設・設備・リフォーム会社様の集客サイト制作と、SEO・MEO・現場DXをまとめてご支援します。",
    highlights: [
      "京都・宇治・舞鶴など、地域のお客様に届くサイト設計",
      "施工実績と信頼感が伝わるホームページ制作",
      "SEO・MEOと合わせて、問い合わせにつながる運用を支援",
    ],
    cities: ["京都市", "宇治市", "舞鶴市", "福知山市"],
    seo: {
      title: "京都府の建設業向けホームページ制作・DX｜Stark Lab",
      description:
        "京都府の建設・設備・リフォーム会社向けホームページ制作、SEO・MEO、現場管理・図面管理のDX支援。全国対応。",
    },
  },
  {
    slug: "osaka",
    name: "大阪府",
    region: "関西",
    lead: "大阪府の設備・電気・建築・土木など建設会社様向けに、ホームページ制作からDXまでワンストップで対応します。",
    highlights: [
      "大阪市内〜北摂・泉州まで、広域の建設業集客を想定した設計",
      "競合の多いエリアでも差別化できる業種特化サイト",
      "KenSapo・DrawStockで現場と図面の情報もクラウド化",
    ],
    cities: ["大阪市", "堺市", "東大阪市", "豊中市", "吹田市"],
    seo: {
      title: "大阪府の建設業向けホームページ制作・DX｜Stark Lab",
      description:
        "大阪府の設備・電気・建築・土木会社向けホームページ制作、SEO・MEO、保守運用、現場DX。全国対応のStark Lab。",
    },
  },
  {
    slug: "hyogo",
    name: "兵庫県",
    region: "関西",
    lead: "兵庫県の水道・設備・建築・塗装など建設会社様のホームページ制作と、SEO・MEO・DXを支援します。",
    highlights: [
      "神戸・姫路など、地域ごとの集客ニーズに合わせた構成",
      "施工事例と問い合わせ導線を重視したサイト制作",
      "公開後の保守・運用まで継続サポート",
    ],
    cities: ["神戸市", "姫路市", "西宮市", "尼崎市", "明石市"],
    seo: {
      title: "兵庫県の建設業向けホームページ制作・DX｜Stark Lab",
      description:
        "兵庫県の水道・設備・建築会社向けホームページ制作、SEO・MEO、KenSapo・DrawStockなどDX支援。全国対応。",
    },
  },
  {
    slug: "nara",
    name: "奈良県",
    region: "関西",
    lead: "奈良県の建設・設備・リフォーム会社様向けに、ホームページ制作から現場DXまでご提案します。",
    highlights: [
      "地域密着の建設会社に合う、シンプルで信頼感のあるサイト",
      "SEO・MEOで地元のお客様からの発見を後押し",
      "図面管理・現場管理など業務効率化もワンストップ",
    ],
    cities: ["奈良市", "橿原市", "生駒市", "大和郡山市"],
    seo: {
      title: "奈良県の建設業向けホームページ制作・DX｜Stark Lab",
      description:
        "奈良県の建設・設備・リフォーム会社向けホームページ制作、SEO・MEO、現場DX支援。全国対応のStark Lab。",
    },
  },
  {
    slug: "aichi",
    name: "愛知県",
    region: "中部",
    lead: "愛知県の設備・電気・建築・土木など建設会社様のホームページ制作と、SEO・MEO・DXを全国対応で支援します。",
    highlights: [
      "名古屋圏の競争環境でも選ばれる業種特化サイト",
      "施工実績・対応エリア・問い合わせ導線を明確に設計",
      "KenSapo・DrawStock・AI活用まで幅広く対応",
    ],
    cities: ["名古屋市", "豊田市", "岡崎市", "一宮市", "豊橋市"],
    seo: {
      title: "愛知県の建設業向けホームページ制作・DX｜Stark Lab",
      description:
        "愛知県の設備・電気・建築・土木会社向けホームページ制作、SEO・MEO、保守運用、DX支援。全国対応。",
    },
  },
  {
    slug: "tokyo",
    name: "東京都",
    region: "関東",
    lead: "東京都の設備・電気・建築・リフォームなど建設会社様向けに、ホームページ制作からDXまでワンストップで支援します。",
    highlights: [
      "首都圏の競合が多い市場でも、業種特化で差別化",
      "SEO・MEOと合わせて、問い合わせにつながる設計",
      "全国対応のため、オンラインでのスムーズな進行が可能",
    ],
    cities: ["23区", "八王子市", "町田市", "府中市"],
    seo: {
      title: "東京都の建設業向けホームページ制作・DX｜Stark Lab",
      description:
        "東京都の設備・電気・建築・リフォーム会社向けホームページ制作、SEO・MEO、KenSapo・DrawStockなどDX支援。全国対応。",
    },
  },
];

export function getAllAreas(): Area[] {
  return areas;
}

export function getAreaBySlug(slug: string): Area | undefined {
  return areas.find((area) => area.slug === slug);
}

export function getAllAreaSlugs(): string[] {
  return areas.map((area) => area.slug);
}

export function getRelatedAreas(area: Area, limit = 4): Area[] {
  return areas.filter((item) => item.slug !== area.slug).slice(0, limit);
}
