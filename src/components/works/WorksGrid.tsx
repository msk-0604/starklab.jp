import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { ScrollReveal } from "../ScrollReveal";

type WorksGridProps = {
  projects: Project[];
};

export function WorksGrid({ projects }: WorksGridProps) {
  return (
    <ul className="grid gap-8 sm:gap-10 lg:grid-cols-2">
      {projects.map((project, index) => (
        <li key={project.slug}>
          <ProjectCard
            project={project}
            delay={(Math.min((index % 4) + 1, 4) || 0) as 0 | 1 | 2 | 3 | 4}
          />
        </li>
      ))}
    </ul>
  );
}

export function WorksPageHero() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(37,99,235,0.12),transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-accent">
              Works
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl sm:leading-[1.15]">
            実績
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Web制作、業務システム、自社プロダクトの事例です。
          </p>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
