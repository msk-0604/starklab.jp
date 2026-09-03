import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { listPublishedPosts } from "@/lib/media";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  filterPostsByCategory,
} from "@/lib/knowledge";
import { getServiceBySlug } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return { title: "カテゴリが見つかりません" };
  return {
    title: `${cat.name}｜Knowledge`,
    description: cat.description,
    alternates: { canonical: `/media/category/${slug}` },
  };
}

export default async function MediaCategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();

  const posts = filterPostsByCategory(await listPublishedPosts(60), slug);

  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "Knowledge", path: "/media" },
    { name: cat.name, path: `/media/category/${slug}` },
  ];

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }}
      />
      <section className="border-b border-border bg-surface pt-28 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 pb-14 sm:px-8">
          <Breadcrumb
            items={[
              { label: "ホーム", href: "/" },
              { label: "Knowledge", href: "/media" },
              { label: cat.name },
            ]}
          />
          <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">{cat.name}</h1>
          <p className="mt-4 max-w-2xl text-muted">{cat.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h2 className="text-sm font-semibold text-muted">関連サービス</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {cat.relatedServiceSlugs.map((s) => {
            const svc = getServiceBySlug(s);
            return svc ? (
              <li key={s}>
                <Link href={`/services/${s}`} className="text-sm text-accent hover:underline">
                  {svc.shortTitle}
                </Link>
              </li>
            ) : null;
          })}
        </ul>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/media/${post.slug}`} className="block rounded border border-border p-5 hover:border-accent/40">
                <h2 className="font-semibold text-foreground">{post.title}</h2>
                <p className="mt-2 text-sm text-muted line-clamp-2">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
        {posts.length === 0 && (
          <p className="text-sm text-muted">このカテゴリの公開記事はまだありません。</p>
        )}
      </section>
    </main>
  );
}
