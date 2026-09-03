import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { listPublishedPosts } from "@/lib/media";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  knowledgeCategories,
  topicClusters,
  inferCategorySlug,
} from "@/lib/knowledge";
import { getAllServices } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

const title = "Stark Lab Knowledge";
const description =
  "Web・AI・DX・SEO・建設・製造に関する知見。サービス・業種・実績とつながるKnowledge Hub。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/media" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: `${siteConfig.url}/media`,
    siteName: siteConfig.name,
    title: `${title}｜${siteConfig.name}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title}｜${siteConfig.name}`,
    description,
  },
};

export default async function MediaPage() {
  const posts = await listPublishedPosts(60);
  const latest = posts.slice(0, 12);
  const services = getAllServices().slice(0, 4);

  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "Knowledge", path: "/media" },
  ];

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <section className="relative overflow-hidden border-b border-border bg-surface pt-28 sm:pt-32">
        <div className="relative mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
          <Breadcrumb
            items={[
              { label: "ホーム", href: "/" },
              { label: "Knowledge" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold tracking-wide text-accent">Knowledge</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Stark Lab Knowledge
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Web・AI・システム・DX・SEOに関する記事を、サービス・業種・実績とつなげて読めるメディアです。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h2 className="font-display text-xl font-bold">カテゴリ</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {knowledgeCategories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/media/category/${cat.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-xl font-bold">Topic Cluster</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {topicClusters.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/media/topics/${t.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-xl font-bold">関連サービス</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="text-sm text-accent hover:underline">
                {s.shortTitle}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/services" className="text-sm text-accent hover:underline">すべてのサービス</Link>
          </li>
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {!isSupabaseConfigured() && (
          <p className="rounded-[var(--radius-card)] border border-border bg-surface px-5 py-8 text-sm text-muted">
            Media用の接続設定が未完了です。公開記事は準備でき次第表示されます。
          </p>
        )}

        {isSupabaseConfigured() && latest.length === 0 && (
          <p className="rounded-[var(--radius-card)] border border-dashed border-border px-5 py-10 text-sm text-muted">
            公開中の記事はまだありません。
          </p>
        )}

        {latest.length > 0 && (
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold">最新記事</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => {
                const catSlug = inferCategorySlug(post.title, post.category);
                return (
                  <li key={post.slug}>
                    <article className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border p-5 transition hover:border-accent/40">
                      <Link href={`/media/category/${catSlug}`} className="text-xs font-medium text-accent">
                        {post.category}
                      </Link>
                      <h3 className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-accent">
                        <Link href={`/media/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-muted">{post.description}</p>
                    </article>
                  </li>
                );
              })}
            </ul>
          </ScrollReveal>
        )}

        <div className="mt-12 text-center">
          <Button href="/#contact">記事に関する相談</Button>
        </div>
      </section>
    </main>
  );
}
