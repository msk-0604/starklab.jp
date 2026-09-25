import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { AnalyticsBootstrap } from "@/components/analytics/AnalyticsBootstrap";
import { Ga4Script } from "@/components/analytics/Ga4Script";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/** Latin display — 編集部っぽいセリフ（SaaS感を避ける） */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** JP display — 明朝でスタジオらしさ */
const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Body */
const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.seoTitle,
    template: `%s｜${siteConfig.name}`,
  },
  description: siteConfig.seoDescription,
  applicationName: siteConfig.name,
  keywords: [
    "スタークラボ",
    "すたーくらぼ",
    "Stark Lab",
    "StarkLab",
    "STARK LAB",
    "スターク ラボ",
    "KENBEI",
    "ケンベイ",
    "現場管理",
    "全国対応",
    "滋賀",
    "大津",
    "DrawStock",
  ],
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteConfig.url,
    siteName: `${siteConfig.name}（${siteConfig.nameJa}）`,
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
    description: siteConfig.seoDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${instrumentSerif.variable} ${shippori.variable} ${zenKaku.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Ga4Script />
        <AnalyticsBootstrap />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
