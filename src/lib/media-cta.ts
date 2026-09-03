/**
 * Media 記事末尾 CTA — 内容に合わせた導線（一律「相談する」を避ける）
 */

export type MediaCta = {
  href: string;
  label: string;
  track: string;
};

type Input = {
  title: string;
  category: string;
  primaryKeyword: string | null;
  serviceSlug?: string | null;
  storedCtaText?: string;
  storedCtaUrl?: string;
};

function blob(input: Input): string {
  return `${input.title} ${input.category} ${input.primaryKeyword ?? ""} ${input.serviceSlug ?? ""}`;
}

export function resolveMediaCta(input: Input): MediaCta {
  const t = blob(input);

  if (/図面|DrawStock|PDF管理/i.test(t)) {
    return {
      href: "/works/drawstock",
      label: "DrawStock（図面管理）の実績を見る",
      track: "media-drawstock",
    };
  }
  if (/KenSapo|現場管理|施工管理|建設DX|工事現場/i.test(t) || input.serviceSlug?.includes("site-management") || input.serviceSlug?.includes("construction")) {
    return {
      href: "/works/kensapo",
      label: "KenSapo（現場管理）の実績を見る",
      track: "media-kensapo",
    };
  }
  if (/AI|ChatGPT|生成AI|自動化/i.test(t)) {
    return {
      href: "/services#ai",
      label: "AI活用支援を見る",
      track: "media-ai",
    };
  }
  if (/SEO|MEO|集客|検索/i.test(t)) {
    return {
      href: "/services#seo",
      label: "SEO・集客支援を見る",
      track: "media-seo",
    };
  }
  if (/ホームページ|Web制作|サイト制作|コーポレート/i.test(t)) {
    return {
      href: "/services#homepage",
      label: "Web制作サービスを見る",
      track: "media-web",
    };
  }
  if (/システム|業務システム|SaaS|管理画面/i.test(t)) {
    return {
      href: "/services#system",
      label: "システム開発を見る",
      track: "media-system",
    };
  }

  // Stored CTA if already normalized to a real path
  const stored = input.storedCtaUrl || "";
  if (stored && !stored.includes("/contact") && stored !== "#") {
    return {
      href: stored,
      label: input.storedCtaText || "詳しく見る",
      track: "media-stored",
    };
  }

  return {
    href: "/#contact",
    label: "無料で相談する",
    track: "media-contact",
  };
}
