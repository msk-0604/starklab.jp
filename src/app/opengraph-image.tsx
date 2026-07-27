import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} - 初期費用0円の定額ホームページ制作`;
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
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#0071e3",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            S
          </div>
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
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#1d1d1f",
              lineHeight: 1.25,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            初期費用0円。月額22,000円でホームページ制作。
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#86868b",
              lineHeight: 1.5,
              maxWidth: 860,
            }}
          >
            制作・公開・保守・更新まで全てお任せ
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#0071e3",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          中小企業・個人事業主向け 定額ホームページ制作
        </div>
      </div>
    ),
    size,
  );
}
