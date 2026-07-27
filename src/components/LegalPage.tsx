import type { ReactNode } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

type LegalPageProps = {
  title: string;
  children: ReactNode;
  updatedAt?: string;
};

export function LegalPage({
  title,
  children,
  updatedAt = "2026年7月28日",
}: LegalPageProps) {
  return (
    <main className="flex-1 bg-white">
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm font-semibold text-accent">{siteConfig.name}</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted">最終更新日：{updatedAt}</p>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="legal-content space-y-8 text-[15px] leading-relaxed text-foreground/90">
          {children}
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <Link
            href="/"
            className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            ← トップページに戻る
          </Link>
        </div>
      </article>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-muted">{children}</div>
    </section>
  );
}
