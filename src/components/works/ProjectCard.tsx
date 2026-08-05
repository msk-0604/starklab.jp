import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Button } from "../Button";
import { ScrollReveal } from "../ScrollReveal";
import { ProjectImage } from "./ProjectImage";

type ProjectCardProps = {
  project: Project;
  delay?: 0 | 1 | 2 | 3 | 4;
  /** 関連実績など、コンパクト表示 */
  compact?: boolean;
};

export function ProjectCard({
  project,
  delay = 0,
  compact = false,
}: ProjectCardProps) {
  return (
    <ScrollReveal as="article" delay={delay} className="h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-[var(--shadow-card)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <Link
          href={`/works/${project.slug}`}
          className="relative block overflow-hidden bg-surface"
          aria-label={`${project.title}の詳細を見る`}
        >
          <div
            className={`relative ${compact ? "aspect-[16/10]" : "aspect-[16/10] sm:aspect-[16/9]"}`}
          >
            <ProjectImage
              src={project.coverImage}
              alt={`${project.title}の制作イメージ`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden="true"
          />
        </Link>

        <div
          className={`flex flex-1 flex-col ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`}
        >
          <p className="text-xs font-semibold tracking-wide text-accent sm:text-sm">
            {project.category}
          </p>

          <h3
            className={`mt-2 font-display font-bold tracking-tight text-foreground ${
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
            }`}
          >
            <Link
              href={`/works/${project.slug}`}
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>

          <p
            className={`mt-3 flex-1 leading-relaxed text-muted ${
              compact ? "text-sm" : "text-sm sm:text-[15px]"
            }`}
          >
            {project.description}
          </p>

          {project.features && project.features.length > 0 && !compact && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="対応内容">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border bg-surface/80 px-2.5 py-1 text-xs font-medium text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.cta.href ? (
              <>
                <Button
                  href={project.cta.href}
                  variant="primary"
                  className="!px-5 !py-2.5 text-sm"
                >
                  {project.cta.label}
                  <ExternalIcon />
                </Button>
                <Link
                  href={`/works/${project.slug}`}
                  className="text-sm font-semibold text-muted transition-colors hover:text-accent"
                >
                  詳細を見る
                </Link>
              </>
            ) : (
              <Button
                href={`/works/${project.slug}`}
                variant="primary"
                className="!px-5 !py-2.5 text-sm"
              >
                {project.cta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 12 12 4M7 4h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
