import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { Contact } from "@/components/Contact";
import { FloatingContact } from "@/components/FloatingContact";
import { StudioHome } from "@/components/StudioHome";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.seoTitle,
  },
  description: siteConfig.seoDescription,
  keywords: [
    ...siteConfig.brandAliases,
    "KENBEI",
    "ケンベイ",
    "現場管理",
    "滋賀",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
    url: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd()),
        }}
      />
      <PageViewTracker pageType="other" dedupeKey="home" />
      <main className="flex-1 pb-20 md:pb-0">
        <StudioHome />
        <Contact />
      </main>
      <FloatingContact />
    </>
  );
}
