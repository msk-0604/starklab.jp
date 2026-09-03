import { siteConfig } from "@/lib/site";
import { getSupabaseAnon, isSupabaseConfigured } from "@/lib/supabase";

export type FaqItem = { question: string; answer: string };
export type HeadingItem = { level: number; text: string };
export type InternalLink = { anchor: string; url: string; service_slug?: string };

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  headings: HeadingItem[] | null;
  faq: FaqItem[] | null;
  content_markdown: string;
  content_html: string | null;
  cta_text: string;
  cta_url: string;
  internal_links: InternalLink[] | null;
  status: string;
  published_at: string | null;
  updated_at: string;
  services?: { slug: string; name: string } | null;
  keywords?: { keyword: string; search_intent: string | null } | null;
};

export type MediaPost = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  author: string;
  publishedAt: string | null;
  updatedAt: string;
  readingTimeMinutes: number;
  contentMarkdown: string;
  contentHtml: string | null;
  headings: HeadingItem[];
  faq: FaqItem[];
  internalLinks: InternalLink[];
  ctaText: string;
  ctaUrl: string;
  primaryKeyword: string | null;
  serviceSlug: string | null;
};

const SELECT =
  "id, slug, title, meta_description, headings, faq, content_markdown, content_html, cta_text, cta_url, internal_links, status, published_at, updated_at, services(slug, name), keywords(keyword, search_intent)";

function readingTime(md: string): number {
  return Math.max(1, Math.ceil(md.replace(/\s/g, "").length / 500));
}

function normalizeUrl(url: string): string {
  if (!url) return "/#contact";
  let u = url.trim();
  u = u.replace(/^https?:\/\/(www\.)?starklab\.jp/, "");
  if (u.startsWith("/articles/")) {
    return `/media/${u.replace("/articles/", "")}`;
  }
  if (u.includes("/articles/")) {
    return u.replace(/\/articles\//g, "/media/");
  }
  // Phantom routes from older engine CTAs
  if (u === "/contact" || u.startsWith("/contact?") || u.startsWith("/contact#")) {
    const q = u.includes("?") ? u.slice(u.indexOf("?")) : "";
    return `/${q}#contact`.replace("/?#", "/#").replace(/^\/\?/, "/?");
  }
  if (u.startsWith("/services/") || u === "/services") {
    const hash = u.includes("#") ? u.slice(u.indexOf("#")) : "";
    const pathSlug = u.replace(/^\/services\/?/, "").split("#")[0].split("?")[0];
    if (pathSlug && pathSlug !== "services") {
      const known = [
        "web-development",
        "system-development",
        "ai-automation",
        "ai-agent",
        "rag",
        "data-dashboard",
        "seo-ai-search",
        "dx-consulting",
      ];
      if (known.includes(pathSlug)) return `/services/${pathSlug}${hash}`;
    }
    if (/kensapo/i.test(u)) return "/works/kensapo";
    if (/drawstock/i.test(u)) return "/works/drawstock";
    if (/web|homepage|hp/i.test(u)) return "/services/web-development";
    if (/system/i.test(u)) return "/services/system-development";
    if (/ai-agent|agent/i.test(u)) return "/services/ai-agent";
    if (/rag|knowledge/i.test(u)) return "/services/rag";
    if (/dashboard|data/i.test(u)) return "/services/data-dashboard";
    if (/dx|consult/i.test(u)) return "/services/dx-consulting";
    if (/ai/i.test(u)) return "/services/ai-automation";
    if (/seo/i.test(u)) return "/services/seo-ai-search";
    return `/services${hash}`;
  }
  if (u.startsWith("http")) return u;
  return u.startsWith("/") ? u : `/${u}`;
}

function adapt(row: ArticleRow): MediaPost {
  const md = row.content_markdown ?? "";
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.meta_description,
    category: row.services?.name || row.keywords?.search_intent?.slice(0, 24) || "ブログ",
    author: `${siteConfig.owner}（${siteConfig.name}）`,
    publishedAt: row.published_at,
    updatedAt: row.updated_at,
    readingTimeMinutes: readingTime(md),
    contentMarkdown: md,
    contentHtml: row.content_html,
    headings: (row.headings ?? []) as HeadingItem[],
    faq: (row.faq ?? []) as FaqItem[],
    internalLinks: ((row.internal_links ?? []) as InternalLink[]).map((l) => ({
      ...l,
      url: normalizeUrl(l.url),
    })),
    ctaText: row.cta_text,
    ctaUrl: normalizeUrl(row.cta_url),
    primaryKeyword: row.keywords?.keyword ?? null,
    serviceSlug: row.services?.slug ?? null,
  };
}

export async function listPublishedPosts(limit = 60): Promise<MediaPost[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAnon();
  const { data, error } = await supabase
    .from("articles")
    .select(SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("[media] list", error.message);
    return [];
  }
  return ((data ?? []) as unknown as ArticleRow[]).map(adapt);
}

export async function getPublishedPost(slug: string): Promise<MediaPost | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseAnon();
  const { data, error } = await supabase
    .from("articles")
    .select(SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  if (error) {
    console.error("[media] get", error.message);
    return null;
  }
  if (!data) return null;
  return adapt(data as unknown as ArticleRow);
}

export async function listPublishedSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseAnon();
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("status", "published");
  if (error) return [];
  return ((data ?? []) as { slug: string }[]).map((r) => r.slug);
}

export async function listRelatedPosts(current: MediaPost, limit = 3): Promise<MediaPost[]> {
  const all = await listPublishedPosts(40);
  return all
    .filter((p) => p.slug !== current.slug)
    .filter((p) => p.category === current.category)
    .slice(0, limit);
}
