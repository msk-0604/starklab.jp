import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

export function AreasPreview() {
  return (
    <section id="areas" className="scroll-mt-24 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl" variant="clip">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Areas
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            日本全国どこでも
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.coverageNote}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" className="min-w-[200px]">
              相談する
            </Button>
            <Link
              href="/areas"
              className="text-sm font-semibold text-muted transition-colors hover:text-accent"
            >
              対応エリアの詳細
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
