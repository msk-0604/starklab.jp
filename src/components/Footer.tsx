import Link from "next/link";
import { getAllAreas } from "@/lib/areas";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/works", label: "Works" },
  { href: "/media", label: "Media" },
  { href: "/areas", label: "対応エリア" },
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokushoho", label: "特定商取引法に基づく表記" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const areas = getAllAreas();

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="font-display text-lg font-bold tracking-tight text-foreground">
          {siteConfig.name}
          <span className="ml-2 text-sm font-medium text-muted">
            （{siteConfig.nameJa}）
          </span>
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {siteConfig.concept}
          <br />
          {siteConfig.coverage} ／ 拠点：{siteConfig.location}
        </p>

        <div className="mt-8">
          <p className="text-xs font-semibold tracking-wide text-muted">
            対応エリア
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
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
        </div>

        <nav
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-6"
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
