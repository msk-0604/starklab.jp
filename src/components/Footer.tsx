import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
  { href: "/services", label: "KENBEI" },
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokushoho", label: "特定商取引法に基づく表記" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="font-display text-lg font-bold tracking-tight text-foreground">
          {siteConfig.name}
        </p>
        <p className="mt-1 text-sm text-muted">{siteConfig.nameJa}</p>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted">
          {siteConfig.concept}
          <br />
          拠点：{siteConfig.location}（打合せはオンライン完結）
          <br />
          運営：{siteConfig.owner}
        </p>

        <nav
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2"
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
        <div className="mx-auto max-w-3xl px-5 py-5 text-center sm:px-8">
          <p className="text-xs text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
