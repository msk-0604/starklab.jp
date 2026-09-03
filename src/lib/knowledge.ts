/**
 * Knowledge Hub — カテゴリ・Topic Cluster
 */

export type KnowledgeCategory = {
  slug: string;
  name: string;
  description: string;
  matchPatterns: RegExp[];
  relatedServiceSlugs: string[];
  relatedIndustrySlugs: string[];
};

export const knowledgeCategories: KnowledgeCategory[] = [
  {
    slug: "ai",
    name: "AI",
    description: "AI活用・導入判断・業務への落とし込み",
    matchPatterns: [/AI|人工知能|生成AI/i],
    relatedServiceSlugs: ["ai-automation", "ai-agent"],
    relatedIndustrySlugs: ["small-business", "manufacturing"],
  },
  {
    slug: "ai-agent",
    name: "AI Agent",
    description: "業務AIエージェント・ワークフロー自動化",
    matchPatterns: [/エージェント|Agent|ワークフロー/i],
    relatedServiceSlugs: ["ai-agent", "ai-automation", "system-development"],
    relatedIndustrySlugs: ["manufacturing", "construction"],
  },
  {
    slug: "rag",
    name: "RAG",
    description: "ナレッジAI・社内検索・資料活用",
    matchPatterns: [/RAG|ナレッジ|検索AI|マニュアル/i],
    relatedServiceSlugs: ["rag", "ai-agent"],
    relatedIndustrySlugs: ["manufacturing", "construction"],
  },
  {
    slug: "dx",
    name: "DX",
    description: "DX推進・業務改善・導入プロセス",
    matchPatterns: [/DX|デジタル|業務改善|効率化/i],
    relatedServiceSlugs: ["dx-consulting", "system-development"],
    relatedIndustrySlugs: ["construction", "small-business"],
  },
  {
    slug: "web",
    name: "Web",
    description: "Web制作・サイト設計・CV改善",
    matchPatterns: [/Web|ホームページ|LP|サイト制作/i],
    relatedServiceSlugs: ["web-development", "seo-ai-search"],
    relatedIndustrySlugs: ["service-business", "real-estate"],
  },
  {
    slug: "seo",
    name: "SEO",
    description: "検索流入・コンテンツ・Technical SEO",
    matchPatterns: [/SEO|検索|集客|MEO|内部リンク/i],
    relatedServiceSlugs: ["seo-ai-search", "web-development"],
    relatedIndustrySlugs: ["construction", "service-business"],
  },
  {
    slug: "construction",
    name: "Construction",
    description: "建設業・現場管理・施工",
    matchPatterns: [/建設|現場|施工|工事|工務|KenSapo|現場管理/i],
    relatedServiceSlugs: ["system-development", "rag"],
    relatedIndustrySlugs: ["construction"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    description: "製造業・工場・技術資料",
    matchPatterns: [/製造|工場|メーカー|図面|BOM|品質/i],
    relatedServiceSlugs: ["rag", "data-dashboard", "ai-agent"],
    relatedIndustrySlugs: ["manufacturing"],
  },
  {
    slug: "system",
    name: "System",
    description: "業務システム・開発・API",
    matchPatterns: [/システム|SaaS|開発|管理画面|API/i],
    relatedServiceSlugs: ["system-development", "data-dashboard"],
    relatedIndustrySlugs: ["construction", "small-business"],
  },
  {
    slug: "data",
    name: "Data",
    description: "データ可視化・Dashboard・分析",
    matchPatterns: [/データ|Dashboard|可視化|KPI|分析/i],
    relatedServiceSlugs: ["data-dashboard", "seo-ai-search"],
    relatedIndustrySlugs: ["manufacturing", "construction"],
  },
];

export type TopicCluster = {
  slug: string;
  name: string;
  description: string;
  hubPath: string;
  links: { label: string; href: string }[];
};

export const topicClusters: TopicCluster[] = [
  {
    slug: "ai-agent",
    name: "AI Agent",
    description: "業務AIエージェントと周辺領域のTopic Cluster",
    hubPath: "/media/topics/ai-agent",
    links: [
      { label: "AI Agent開発", href: "/services/ai-agent" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "RAG / Knowledge AI", href: "/services/rag" },
      { label: "System Development", href: "/services/system-development" },
      { label: "制作実績", href: "/works" },
      { label: "AI Agent 記事", href: "/media/category/ai-agent" },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing DX",
    description: "製造業DXのTopic Cluster",
    hubPath: "/media/topics/manufacturing",
    links: [
      { label: "製造業DX", href: "/industries/manufacturing" },
      { label: "RAG / Knowledge AI", href: "/services/rag" },
      { label: "図面管理実績 DrawStock", href: "/works/drawstock" },
      { label: "Data / Dashboard", href: "/services/data-dashboard" },
      { label: "AI Agent", href: "/services/ai-agent" },
      { label: "製造業 記事", href: "/media/category/manufacturing" },
    ],
  },
  {
    slug: "construction",
    name: "Construction DX",
    description: "建設業DXのTopic Cluster",
    hubPath: "/media/topics/construction",
    links: [
      { label: "建設業DX", href: "/industries/construction" },
      { label: "KenSapo", href: "/works/kensapo" },
      { label: "DrawStock", href: "/works/drawstock" },
      { label: "System Development", href: "/services/system-development" },
      { label: "AI Automation", href: "/services/ai-automation" },
      { label: "RAG", href: "/services/rag" },
      { label: "建設業 記事", href: "/media/category/construction" },
    ],
  },
  {
    slug: "seo-ai-search",
    name: "SEO / AI Search",
    description: "検索・AI検索・コンテンツ成長のTopic Cluster",
    hubPath: "/media/topics/seo-ai-search",
    links: [
      { label: "SEO / AI Search Growth", href: "/services/seo-ai-search" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "Knowledge（Media）", href: "/media" },
      { label: "SEO 記事", href: "/media/category/seo" },
    ],
  },
];

export function getCategoryBySlug(slug: string): KnowledgeCategory | undefined {
  return knowledgeCategories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return knowledgeCategories.map((c) => c.slug);
}

export function getTopicCluster(slug: string): TopicCluster | undefined {
  return topicClusters.find((t) => t.slug === slug);
}

export function getAllTopicSlugs(): string[] {
  return topicClusters.map((t) => t.slug);
}

/** 記事タイトル・カテゴリからKnowledgeカテゴリを推定 */
export function inferCategorySlug(title: string, category: string): string {
  const text = `${title} ${category}`;
  for (const cat of knowledgeCategories) {
    if (cat.matchPatterns.some((re) => re.test(text))) return cat.slug;
  }
  return "dx";
}

export function filterPostsByCategory<T extends { title: string; category: string }>(
  posts: T[],
  categorySlug: string,
): T[] {
  const cat = getCategoryBySlug(categorySlug);
  if (!cat) return posts;
  return posts.filter((p) => {
    const text = `${p.title} ${p.category}`;
    return cat.matchPatterns.some((re) => re.test(text));
  });
}
