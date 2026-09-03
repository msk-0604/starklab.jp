import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { ProjectDetail } from "@/components/works/ProjectDetail";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getRelatedProjects,
} from "@/lib/projects";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "制作実績が見つかりません",
    };
  }

  const url = `${siteConfig.url}/works/${project.slug}`;
  const ogImage = `${siteConfig.url}${project.coverImage}`;

  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: {
      canonical: `/works/${project.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      url,
      siteName: siteConfig.name,
      title: project.seo.title,
      description: project.seo.description,
      images: [
        {
          url: ogImage,
          width: 1600,
          height: 1000,
          alt: `${project.title}の制作イメージ`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.title,
      description: project.seo.description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(project);
  const breadcrumbs = [
    { name: "ホーム", path: "/" },
    { name: "制作実績", path: "/works" },
    { name: project.title, path: `/works/${project.slug}` },
  ];

  return (
    <>
      <PageViewTracker pageType="case_study" dedupeKey={project.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <main className="flex-1">
        <ProjectDetail
          project={project}
          related={related}
          breadcrumbs={[
            { label: "ホーム", href: "/" },
            { label: "制作実績", href: "/works" },
            { label: project.title },
          ]}
        />
      </main>
    </>
  );
}
