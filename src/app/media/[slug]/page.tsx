import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { Button } from "@/components/Button";
import { MediaTracker } from "@/components/analytics/MediaTracker";
import {
  getPublishedPost,
  listPublishedSlugs,
  listRelatedPosts,
} from "@/lib/media";
import { resolveMediaCta } from "@/lib/media-cta";
import { markdownToSafeHtml, sanitizeStoredHtml, slugifyHeading } from "@/lib/markdown";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await listPublishedSlugs();
  return slugs.slice(0, 100).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "記事が見つかりません", robots: { index: false } };
  const url = `${siteConfig.url}/media/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url,
      siteName: siteConfig.name,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function MediaArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const related = await listRelatedPosts(post, 3);
  const toc = post.headings.filter((h) => h.level === 2).slice(0, 12);
  const bodyHtml = post.contentHtml
    ? sanitizeStoredHtml(post.contentHtml)
    : markdownToSafeHtml(post.contentMarkdown);
  const cta = resolveMediaCta({
    title: post.title,
    category: post.category,
    primaryKeyword: post.primaryKeyword,
    serviceSlug: post.serviceSlug,
    storedCtaText: post.ctaText,
    storedCtaUrl: post.ctaUrl,
  });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: siteConfig.owner,
      worksFor: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/media/${post.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Knowledge", item: `${siteConfig.url}/media` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/media/${post.slug}`,
      },
    ],
  };

  return (
    <main className="flex-1">
      <MediaTracker slug={post.slug} articleId={post.id} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faq.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}

      <article className="mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <Breadcrumb
          items={[
            { label: "ホーム", href: "/" },
            { label: "Knowledge", href: "/media" },
            { label: post.title },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="text-sm font-semibold tracking-wide text-accent">{post.category}</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted">{post.description}</p>
          <p className="mt-1 text-xs text-muted">
            運営：{siteConfig.name}（{siteConfig.owner}）
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                公開 {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
              </time>
            )}
            {post.updatedAt && (
              <time dateTime={post.updatedAt}>
                更新 {new Date(post.updatedAt).toLocaleDateString("ja-JP")}
              </time>
            )}
            <span>約{post.readingTimeMinutes}分</span>
          </div>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-wide text-muted">目次</p>
              {toc.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {toc.map((h) => (
                    <li key={h.text}>
                      <a
                        href={`#${slugifyHeading(h.text)}`}
                        className="hover:text-foreground"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-muted">—</p>
              )}
            </div>
          </aside>

          <div>
            <div
              className="prose-media max-w-3xl text-[17px] leading-8 text-foreground/90 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:my-1 [&_p]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-surface [&_pre]:p-4 [&_pre]:text-sm [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            <div className="mt-12 max-w-3xl rounded-[var(--radius-card)] border border-border bg-surface px-5 py-6">
              <p className="text-sm text-muted">この記事の次のステップ</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href={cta.href} data-track-cta={cta.track}>
                  {cta.label}
                </Button>
                {!cta.href.includes("#contact") ? (
                  <Button
                    href="/#contact"
                    variant="secondary"
                    data-track-cta="media-contact-secondary"
                  >
                    無料で相談する
                  </Button>
                ) : null}
              </div>
            </div>

            {post.internalLinks.length > 0 && (
              <section className="mt-10 max-w-3xl">
                <h2 className="font-display text-xl font-bold tracking-tight">関連リンク</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  {post.internalLinks.map((l) => (
                    <li key={`${l.url}-${l.anchor}`}>
                      <a
                        href={l.url}
                        className="text-accent underline-offset-2 hover:underline"
                        data-track-service={l.url.includes("/services") ? "1" : undefined}
                        rel="noopener noreferrer"
                      >
                        {l.anchor}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {post.faq.length > 0 && (
              <section className="mt-14 max-w-3xl border-t border-border pt-10">
                <h2 className="font-display text-2xl font-bold tracking-tight">よくある質問</h2>
                <dl className="mt-6 space-y-5">
                  {post.faq.map((f) => (
                    <div key={f.question}>
                      <dt className="font-medium">Q. {f.question}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-muted">A. {f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-14 max-w-3xl border-t border-border pt-10">
                <h2 className="font-display text-2xl font-bold tracking-tight">関連記事</h2>
                <ul className="mt-6 space-y-4">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/media/${r.slug}`}
                        className="font-medium text-foreground hover:text-accent"
                      >
                        {r.title}
                      </Link>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">{r.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-14 max-w-3xl rounded-[var(--radius-card)] bg-foreground px-6 py-10 text-white">
              <h2 className="font-display text-2xl font-bold">次の一歩</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                ホームページ制作・システム開発・AI活用について、まずは課題整理からご相談ください。
              </p>
              <div className="mt-6">
                <Link
                  href="/#contact"
                  className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-foreground"
                >
                  お問い合わせ
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
