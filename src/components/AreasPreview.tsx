import Link from "next/link";
import { getAllAreas } from "@/lib/areas";
import { siteConfig } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function AreasPreview() {
  const areas = getAllAreas();

  return (
    <section id="areas" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Areas
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            日本全国どこでも
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.coverageNote}
          </p>
        </ScrollReveal>

        <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2">
          {areas.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/areas/${area.slug}`}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">ほか、日本全国</p>
      </div>
    </section>
  );
}
