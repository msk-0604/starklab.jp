import Link from "next/link";
import { getAllProjects, type Project } from "@/lib/projects";
import { ScrollReveal } from "./ScrollReveal";
import { ProjectBrandPanel } from "./works/ProjectBrandPanel";
import { ProjectImage } from "./works/ProjectImage";

/** トップで主に見せる自社プロダクト */
const FEATURED_SLUGS = ["kenbei", "drawstock"] as const;

export function OurProjects() {
  const all = getAllProjects();
  const featured = FEATURED_SLUGS.map((slug) =>
    all.find((project) => project.slug === slug),
  ).filter((project): project is Project => Boolean(project));

  return (
    <section id="projects" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <p className="text-sm font-semibold tracking-wide text-accent">
            Our project
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            実績・自社サービス
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Stark Labが自社開発・運営するプロダクトと、Web制作などのプロジェクトです。顧客への導入事例と混同しないよう、自社サービスはカテゴリで明示しています。
          </p>
        </ScrollReveal>

        <ul className="mt-14 space-y-8">
          {featured.map((project, index) => (
            <ScrollReveal
              key={project.slug}
              as="li"
              delay={(Math.min(index + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}
            >
              <Link
                href={`/works/${project.slug}`}
                className="group grid overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] lg:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[280px]">
                  {project.coverImage ? (
                    <ProjectImage
                      src={project.coverImage}
                      alt={`${project.title}のイメージ`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <ProjectBrandPanel
                      title={project.title}
                      category={project.category}
                      logoSrc={project.brandLogo}
                      className="absolute inset-0 min-h-0"
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <p className="text-sm font-semibold tracking-wide text-accent">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {project.features ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="rounded-full bg-white px-3 py-1 text-xs font-medium text-foreground/80"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="mt-8 text-sm font-semibold text-accent transition-colors group-hover:text-accent-hover">
                    詳しく見る
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal className="mt-12">
          <Link
            href="/works"
            className="text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            すべてのプロジェクトを見る
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
