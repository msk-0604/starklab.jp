import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { Button } from "@/components/Button";
import { ScrollReveal } from "@/components/ScrollReveal";
import { listPublishedPosts } from "@/lib/media";
import { isSupabaseConfigured } from "@/lib/supabase";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

const title = "Media";
const description =
  "建設業のWeb集客・DX・現場管理・AI活用について、Stark Labが発信する企業ブログです。";

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

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-border bg-surface pt-28 sm:pt-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(700px 320px at 15% 0%, rgba(37,99,235,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 sm:px-8 sm:pb-16">
          <Breadcrumb
            items={[
              { label: "ホーム", href: "/" },
              { label: "Media" },
            ]}
          />
          <p className="mt-6 text-sm font-semibold tracking-wide text-accent">Media</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            建設業の課題解決に役立つ知見
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            SEO・ホームページ集客・現場DX・業務効率化など、現場と経営に効く情報を発信しています。
            記事は Stark SEO Engine が日次で生成し、品質チェック後に公開します。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        {!isSupabaseConfigured() && (
          <p className="rounded-[var(--radius-card)] border border-border bg-surface px-5 py-8 text-sm text-muted">
            Media用の接続設定が未完了です。公開記事は準備でき次第表示されます。
          </p>
        )}

        {isSupabaseConfigured() && latest.length === 0 && (
          <p className="rounded-[var(--radius-card)] border border-dashed border-border px-5 py-10 text-sm text-muted">
            公開中の記事はまだありません。管理画面で記事を公開すると、ここに企業ブログとして表示されます。
          </p>
        )}

        {latest.length > 0 && (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post, i) => (
              <li key={post.id}>
                    <ScrollReveal delay={Math.min(i, 4) as 0 | 1 | 2 | 3 | 4}>
                  <Link
                    href={`/media/${post.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-white p-5 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                  >
                    <p className="text-xs font-semibold tracking-wide text-accent">
                      {post.category}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-foreground group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.description}
                    </p>
                    <p className="mt-4 text-xs text-muted">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("ja-JP")
                        : ""}
                      {" · "}約{post.readingTimeMinutes}分
                    </p>
                  </Link>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="rounded-[var(--radius-card)] border border-border bg-white px-6 py-10 sm:px-10">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              記事の内容を、実装に移す
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              ホームページ制作・SEO・現場管理・AI活用まで、建設業に特化してご相談いただけます。
            </p>
            <div className="mt-6">
              <Button href="/#contact">相談する</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
