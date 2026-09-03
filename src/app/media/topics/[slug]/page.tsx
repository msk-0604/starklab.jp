import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/works/Breadcrumb";
import { getTopicCluster, getAllTopicSlugs } from "@/lib/knowledge";
import { breadcrumbJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getTopicCluster(slug);
  if (!cluster) return { title: "トピックが見つかりません" };
  return {
    title: `${cluster.name}｜Topic Cluster`,
    description: cluster.description,
    alternates: { canonical: `/media/topics/${slug}` },
  };
}

export default async function MediaTopicPage({ params }: Props) {
  const { slug } = await params;
  const cluster = getTopicCluster(slug);
  if (!cluster) notFound();

  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "Knowledge", path: "/media" },
    { name: cluster.name, path: `/media/topics/${slug}` },
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
              { label: cluster.name },
            ]}
          />
          <p className="mt-6 text-sm font-semibold text-accent">Topic Cluster</p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{cluster.name}</h1>
          <p className="mt-4 max-w-2xl text-muted">{cluster.description}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <h2 className="font-display text-xl font-bold">関連ページ</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {cluster.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-accent hover:underline">{l.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
