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
          background: "#f7f5f0",
          fontFamily: "serif",
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
              fontWeight: 400,
              color: "#1a1917",
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#5c5852",
            }}
          >
            {siteConfig.nameJa}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 400,
              color: "#1a1917",
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
              color: "#5c5852",
              lineHeight: 1.5,
              maxWidth: 900,
            }}
          >
            KENBEI — app.kenbei.jp
          </div>
        </div>

        <div
          style={{
            display: "flex",
            color: "#5c5852",
            fontSize: 20,
          }}
        >
          {siteConfig.owner}
        </div>
      </div>
    ),
    size,
  );
}
