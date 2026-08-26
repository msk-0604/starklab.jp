import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name}（${siteConfig.nameJa}）｜建設業に特化したホームページ制作・DXパートナー`,
    template: `%s｜${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "スタークラボ",
    "すたーくらぼ",
    "Stark Lab",
    "スターク ラボ",
    "建設業",
    "ホームページ制作",
    "SEO",
    "MEO",
    "DX",
    "現場管理",
    "図面管理",
    "全国対応",
    "滋賀",
    "大阪",
    "東京",
    "KenSapo",
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
    title: `${siteConfig.name}（${siteConfig.nameJa}）｜建設業に特化したホームページ制作・DXパートナー`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}（${siteConfig.nameJa}）｜建設業に特化したホームページ制作・DXパートナー`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
      className={`${plusJakarta.variable} ${notoSansJp.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
