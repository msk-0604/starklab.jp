import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokushoho", label: "特定商取引法に基づく表記" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            定額ホームページ制作サービス
          </p>
        </div>

        <nav
          className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6"
          aria-label="フッターナビ"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-5 sm:px-8">
          <p className="text-xs text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
