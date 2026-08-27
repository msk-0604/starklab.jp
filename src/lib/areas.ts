/**
 * 地域ランディングページ用データ
 * 新規エリアは配列に追加するだけで一覧・詳細・sitemapに反映されます。
 */

export type Area = {
  slug: string;
  name: string;
  region: string;
  lead: string;
  highlights: string[];
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
    lead: "滋賀県を拠点に、Web制作・システム開発・AI活用を全国対応で支援します。大津・草津をはじめ、オンラインで日本全国どこでもご相談いただけます。",
    highlights: [
      "拠点のある滋賀から、オンラインで全国の企業をご支援",
      "ホームページ、業務システム、AI導入まで必要な範囲から開始",
      "掲載のない都道府県も、全国どこでも対応します",
    ],
    cities: ["大津市", "草津市", "彦根市", "長浜市", "東近江市"],
    seo: {
      title: "滋賀県のWeb制作・システム開発・AI｜Stark Lab",
      description:
        "滋賀県拠点のStark Lab。ホームページ制作、業務システム、AI活用、SEOを全国対応で支援。大津・草津など近隣はもちろん、日本全国どこでもオンライン対応。",
    },
  },
  {
    slug: "kyoto",
    name: "京都府",
    region: "関西",
    lead: "京都府の企業・店舗向けに、ホームページ制作、業務システム、AI活用、SEOをオンラインで支援します。全国対応です。",
    highlights: [
      "京都・宇治など関西のお客様にも、オンラインでスムーズに進行",
      "問い合わせにつながるWebと、業務を効率化するシステムをまとめて設計",
      "日本全国どこでも同じ品質で対応",
    ],
    cities: ["京都市", "宇治市", "舞鶴市", "福知山市"],
    seo: {
      title: "京都府のWeb制作・システム開発・AI｜Stark Lab",
      description:
        "京都府のホームページ制作、業務システム、AI活用、SEO支援。全国対応のStark Lab。オンライン完結で日本全国どこでもご相談いただけます。",
    },
  },
  {
    slug: "osaka",
    name: "大阪府",
    region: "関西",
    lead: "大阪府の企業向けに、Web制作・システム開発・AI活用を全国対応で支援します。オンライン完結です。",
    highlights: [
      "大阪市内〜北摂・泉州まで、オンラインで打合せ可能",
      "競合の多い市場でも、サービスと実績が伝わるサイト・システムを設計",
      "日本全国どこでも対応。エリアによる制限はありません",
    ],
    cities: ["大阪市", "堺市", "東大阪市", "豊中市", "吹田市"],
    seo: {
      title: "大阪府のWeb制作・システム開発・AI｜Stark Lab",
      description:
        "大阪府のホームページ制作、業務システム、AI活用、SEO支援。全国対応のStark Lab。オンラインで日本全国どこでも対応します。",
    },
  },
  {
    slug: "hyogo",
    name: "兵庫県",
    region: "関西",
    lead: "兵庫県の企業向けに、ホームページ制作、業務システム、AI活用、SEOを支援します。全国対応・オンライン完結です。",
    highlights: [
      "神戸・姫路など、地域を問わずオンラインで進行",
      "公開後の保守・運用まで継続サポート",
      "掲載のない地域も含め、日本全国どこでもご相談ください",
    ],
    cities: ["神戸市", "姫路市", "西宮市", "尼崎市", "明石市"],
    seo: {
      title: "兵庫県のWeb制作・システム開発・AI｜Stark Lab",
      description:
        "兵庫県のホームページ制作、業務システム、AI活用、SEO支援。全国対応のStark Lab。",
    },
  },
  {
    slug: "nara",
    name: "奈良県",
    region: "関西",
    lead: "奈良県の企業向けに、Web制作・システム開発・AI活用をご提案します。全国対応です。",
    highlights: [
      "信頼感のあるサイトと、使いやすい業務システムを設計",
      "SEOと合わせて、問い合わせにつながる運用を支援",
      "日本全国どこでも、オンラインで同じ流れで進行します",
    ],
    cities: ["奈良市", "橿原市", "生駒市", "大和郡山市"],
    seo: {
      title: "奈良県のWeb制作・システム開発・AI｜Stark Lab",
      description:
        "奈良県のホームページ制作、業務システム、AI活用、SEO支援。全国対応のStark Lab。",
    },
  },
  {
    slug: "aichi",
    name: "愛知県",
    region: "中部",
    lead: "愛知県の企業向けに、ホームページ制作、業務システム、AI活用を全国対応で支援します。",
    highlights: [
      "名古屋圏でも選ばれる情報設計とシステム設計",
      "Web・システム・AIまで幅広く対応",
      "エリア制限なし。日本全国どこでもオンライン対応",
    ],
    cities: ["名古屋市", "豊田市", "岡崎市", "一宮市", "豊橋市"],
    seo: {
      title: "愛知県のWeb制作・システム開発・AI｜Stark Lab",
      description:
        "愛知県のホームページ制作、業務システム、AI活用、SEO支援。全国対応のStark Lab。",
    },
  },
  {
    slug: "tokyo",
    name: "東京都",
    region: "関東",
    lead: "東京都の企業向けに、Web制作・システム開発・AI活用をワンストップで支援します。全国対応のため、オンラインでスムーズに進められます。",
    highlights: [
      "首都圏のお客様にも、オンラインで全国と同じ品質で対応",
      "問い合わせにつながるWebと、業務を支えるシステムを設計",
      "日本全国どこでもご相談ください",
    ],
    cities: ["23区", "八王子市", "町田市", "府中市"],
    seo: {
      title: "東京都のWeb制作・システム開発・AI｜Stark Lab",
      description:
        "東京都のホームページ制作、業務システム、AI活用、SEO支援。全国対応のStark Lab。オンライン完結。",
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
