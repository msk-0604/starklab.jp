import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/services", label: "サービス" },
  { href: "/industries", label: "業種別" },
  { href: "/works", label: "実績" },
  { href: "/media", label: "Knowledge" },
  { href: "/about", label: "会社概要" },
  { href: "/areas", label: "対応エリア" },
  { href: "/#contact", label: "お問い合わせ" },
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokushoho", label: "特定商取引法に基づく表記" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

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
          日本全国どこでも対応 ／ 打合せ・納品はオンライン完結
          <br />
          運営：{siteConfig.owner}
        </p>

        <div className="mt-8">
          <p className="text-xs font-semibold tracking-wide text-muted">対応エリア</p>
          <p className="mt-2 text-sm text-muted">{siteConfig.coverageNote}</p>
          <Link href="/areas" className="mt-3 inline-block text-sm font-medium text-accent hover:text-accent-hover">
            対応エリアの詳細
          </Link>
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
