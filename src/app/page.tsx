import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { AreasPreview } from "@/components/AreasPreview";
import { Contact } from "@/components/Contact";
import { FloatingContact } from "@/components/FloatingContact";
import { Hero } from "@/components/Hero";
import { HomeIntroVideo } from "@/components/HomeIntroVideo";
import { HomeFaq } from "@/components/HomeFaq";
import {
  HomeAbout,
  HomeChallenges,
  HomeIntegrated,
  HomeServicesGrid,
  HomeIndustriesGrid,
  HomeProcess,
  HomeWhyUs,
  HomeKnowledge,
} from "@/components/HomeSections";
import { InquiryBand } from "@/components/InquiryBand";
import { OurProjects } from "@/components/OurProjects";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: siteConfig.seoTitle,
  },
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
      <PageViewTracker pageType="other" dedupeKey="home" />
      <HomeIntroVideo />
      <main className="flex-1 pb-20 md:pb-0">
        <Hero />
        <HomeAbout />
        <HomeChallenges />
        <HomeServicesGrid />
        <HomeIndustriesGrid />
        <HomeIntegrated />
        <OurProjects />
        <HomeProcess />
        <HomeWhyUs />
        <HomeKnowledge />
        <AreasPreview />
        <InquiryBand />
        <HomeFaq />
        <Contact />
      </main>
      <FloatingContact />
    </>
  );
}
