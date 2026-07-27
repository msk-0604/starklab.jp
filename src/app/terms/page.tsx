import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "利用規約",
  description: `${siteConfig.name}の利用規約です。`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="利用規約">
      <p>
        本利用規約（以下「本規約」）は、{siteConfig.name}
        （以下「当サービス」）が提供するホームページ制作・運用サービス（以下「本サービス」）の利用条件を定めるものです。お客様には、本規約に同意のうえ本サービスをご利用いただきます。
      </p>

      <LegalSection title="第1条（適用）">
        <p>
          本規約は、お客様と当サービスとの間の本サービスの利用に関わる一切の関係に適用されます。
        </p>
      </LegalSection>

      <LegalSection title="第2条（サービス内容）">
        <p>
          当サービスは、ホームページの制作、公開、サーバー・ドメイン管理、SSL対応、保守、更新サポート等を月額定額で提供します。具体的な範囲は、個別の契約内容に従います。
        </p>
      </LegalSection>

      <LegalSection title="第3条（契約の成立）">
        <p>
          お客様からの申込みに対し、当サービスが承諾した時点で契約が成立するものとします。
        </p>
      </LegalSection>

      <LegalSection title="第4条（料金および支払い）">
        <p>
          初期費用は0円（税込）、月額料金は22,000円（税込）とします。お支払いはクレジットカード（Stripe）によるものとします。料金改定がある場合は、事前にお知らせします。
        </p>
      </LegalSection>

      <LegalSection title="第5条（お客様の協力）">
        <p>
          お客様は、制作・更新に必要な原稿、画像、ロゴ、連絡先情報等を、合理的な期間内にご提供いただくものとします。ご提供の遅延により制作が遅れる場合があることをご了承ください。
        </p>
      </LegalSection>

      <LegalSection title="第6条（知的財産権）">
        <p>
          本サービスにより制作された成果物の取扱いは、個別契約に定めるとおりとします。お客様から提供された素材の権利はお客様に帰属し、当サービスは本サービスの提供に必要な範囲でのみ使用します。
        </p>
      </LegalSection>

      <LegalSection title="第7条（禁止事項）">
        <p>お客様は、以下の行為を行ってはなりません。</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>法令または公序良俗に反する行為</li>
          <li>犯罪行為に関連する行為</li>
          <li>当サービスの運営を妨害する行為</li>
          <li>第三者の権利を侵害する行為</li>
          <li>その他、当サービスが不適切と判断する行為</li>
        </ul>
      </LegalSection>

      <LegalSection title="第8条（契約の解除）">
        <p>
          お客様または当サービスは、契約内容に定める方法により契約を解除できます。料金の精算、データの取扱い等は契約内容に従います。
        </p>
      </LegalSection>

      <LegalSection title="第9条（免責）">
        <p>
          当サービスは、本サービスの提供にあたって合理的な注意を払いますが、通信障害、第三者サービスの停止、不可抗力等により生じた損害について、当サービスに故意または重過失がある場合を除き責任を負いません。
        </p>
      </LegalSection>

      <LegalSection title="第10条（規約の変更）">
        <p>
          当サービスは、必要に応じて本規約を変更できます。変更後の規約は、本サイト上に掲載した時点から効力を生じるものとします。
        </p>
      </LegalSection>

      <LegalSection title="第11条（お問い合わせ）">
        <p>
          本規約に関するお問い合わせは、{siteConfig.email}{" "}
          までご連絡ください。
        </p>
        <p className="mt-4">
          運営：{siteConfig.name}
          <br />
          責任者：{siteConfig.owner}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
