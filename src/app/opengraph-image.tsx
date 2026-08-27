import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - ${siteConfig.concept}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #ffffff 0%, #f5f5f7 45%, #e8f1fc 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#2563eb",
              padding: "8px 16px",
              borderRadius: 999,
              background: "rgba(37,99,235,0.08)",
            }}
          >
            {siteConfig.coverage}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#1d1d1f",
              lineHeight: 1.25,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            {siteConfig.concept}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#86868b",
              lineHeight: 1.5,
              maxWidth: 900,
            }}
          >
          ホームページ制作 / SEO / MEO / 保守運用 / 業務改善
        </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#2563eb",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          建設業に強い × 全国対応
        </div>
      </div>
    ),
    size,
  );
}
