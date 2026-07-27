import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { formatYen, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description: `${siteConfig.name}の特定商取引法に基づく表記です。`,
  alternates: { canonical: "/tokushoho" },
};

const rows = [
  { label: "販売事業者", value: siteConfig.name },
  { label: "運営責任者", value: siteConfig.owner },
  {
    label: "所在地",
    value: siteConfig.address,
    note: "src/lib/site.ts の address を編集してください",
  },
  {
    label: "電話番号",
    value: siteConfig.phone,
    note: "src/lib/site.ts の phone を編集してください",
  },
  { label: "メールアドレス", value: siteConfig.email },
  {
    label: "販売価格",
    value: `ホームページ制作\n初期費用 ${formatYen(siteConfig.pricing.initial)}円（税込）\n月額料金 ${formatYen(siteConfig.pricing.monthly)}円（税込）`,
  },
  { label: "支払い方法", value: siteConfig.paymentMethod },
  { label: "サービス提供時期", value: "契約後、制作開始" },
  { label: "返品・キャンセル", value: "契約内容に基づきます。" },
] as const;

export default function TokushohoPage() {
  return (
    <LegalPage title="特定商取引法に基づく表記">
      <p>
        特定商取引法に基づき、以下のとおり表記します。所在地・電話番号は、公開準備が整い次第、サイト設定より更新します。
      </p>

      <div className="overflow-hidden rounded-[1.25rem] border border-border">
        <dl>
          {rows.map((row, index) => (
            <div
              key={row.label}
              className={`grid gap-2 px-5 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:px-6 ${
                index !== rows.length - 1 ? "border-b border-border" : ""
              } ${index % 2 === 0 ? "bg-white" : "bg-surface/60"}`}
            >
              <dt className="text-sm font-semibold text-foreground">
                {row.label}
              </dt>
              <dd className="whitespace-pre-line text-[15px] text-muted">
                {row.value}
                {"note" in row && row.note ? (
                  <span className="mt-2 block text-xs text-muted/80">
                    ※ {row.note}
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </LegalPage>
  );
}
