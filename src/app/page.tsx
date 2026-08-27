import { AreasPreview } from "@/components/AreasPreview";
import { Contact } from "@/components/Contact";
import { FloatingContact } from "@/components/FloatingContact";
import { Hero } from "@/components/Hero";
import { HomeFaq } from "@/components/HomeFaq";
import { Industries } from "@/components/Industries";
import { InquiryBand } from "@/components/InquiryBand";
import { OurProjects } from "@/components/OurProjects";
import { ServiceOfferings } from "@/components/ServiceOfferings";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.seoTitle,
  description: siteConfig.seoDescription,
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
      <main className="flex-1 pb-20 md:pb-0">
        <Hero />
        <ServiceOfferings />
        <Industries />
        <OurProjects />
        <AreasPreview />
        <InquiryBand />
        <HomeFaq />
        <Contact />
      </main>
      <FloatingContact />
    </>
  );
}
