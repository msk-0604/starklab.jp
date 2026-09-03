import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${siteConfig.name}のプライバシーポリシーです。`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="プライバシーポリシー" updatedAt="2026年8月27日">
      <p>
        {siteConfig.name}
        （以下「当サービス」）は、お客様の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」）を定めます。
      </p>

      <LegalSection title="1. 収集する情報">
        <p>当サービスは、お問い合わせ等に際し、以下の情報を取得することがあります。</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>会社名</li>
          <li>お名前</li>
          <li>メールアドレス</li>
          <li>電話番号</li>
          <li>お問い合わせ内容</li>
          <li>その他、サービス提供に必要な情報</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. 利用目的">
        <p>取得した個人情報は、以下の目的で利用します。</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>お問い合わせへの回答、ご連絡</li>
          <li>本サービスの提供・運営・改善</li>
          <li>契約の履行および関連する事務処理</li>
          <li>重要なお知らせの通知</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 第三者提供">
        <p>
          当サービスは、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供しません。ただし、決済処理（Stripe等）やサーバー提供など、業務委託先に必要な範囲で取り扱う場合があります。
        </p>
      </LegalSection>

      <LegalSection title="4. 安全管理">
        <p>
          当サービスは、個人情報の漏えい、滅失、毀損の防止のため、合理的な安全管理措置を講じます。
        </p>
      </LegalSection>

      <LegalSection title="5. 開示・訂正・削除">
        <p>
          お客様ご本人から個人情報の開示、訂正、削除等のご請求があった場合、ご本人確認のうえ、合理的な範囲で対応します。
        </p>
      </LegalSection>

      <LegalSection title="6. Cookie等・アクセス解析">
        <p>
          当サイトでは、サイト改善やアクセス解析のため Cookie
          等を使用する場合があります。ブラウザ設定により Cookie
          を無効にすることも可能ですが、一部機能がご利用いただけない場合があります。
        </p>
        <p className="mt-4">
          また、問い合わせ経路の把握のため、ブラウザの
          localStorage／sessionStorage
          に訪問識別子・流入元（UTM等）・参照記事スラッグなどの非個人情報を保存することがあります。氏名・メールアドレスなどの個人情報はここに保存しません。
        </p>
        <p className="mt-4">
          Google
          Analytics（GA4）を利用する場合があります。その場合、利用者の端末情報等がGoogleに送信されることがあります。詳細はGoogleのプライバシーポリシーをご確認ください。
        </p>
      </LegalSection>

      <LegalSection title="7. ポリシーの変更">
        <p>
          本ポリシーの内容は、必要に応じて変更することがあります。変更後の内容は、本ページに掲載した時点で効力を生じます。
        </p>
      </LegalSection>

      <LegalSection title="8. お問い合わせ窓口">
        <p>
          個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
        </p>
        <p className="mt-4">
          運営：{siteConfig.name}
          <br />
          責任者：{siteConfig.owner}
          <br />
          メール：{siteConfig.email}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
