# Stark Lab

中小企業・個人事業主向け、サブスクリプション型ホームページ制作サービスのランディングページです。

## 技術スタック

- Next.js 16（App Router）
- TypeScript
- Tailwind CSS v4
- Vercel デプロイ想定

## はじめに

```bash
npm install
npm run dev
```

http://localhost:3000 で確認できます。

## 編集ポイント

### 所在地・電話番号

特定商取引法に基づく表記ページ（`/tokushoho`）のみに表示されます。トップ・フッターには出しません。

`src/lib/site.ts` の `address` / `phone` で管理しています。

### サイトURL（本番）

`.env.local` に設定します。

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### お問い合わせメール送信（任意）

未設定でもフォームはバリデーション後に受付完了します。本番でメール送信する場合は Resend を利用できます。

```bash
RESEND_API_KEY=re_xxxx
CONTACT_FROM_EMAIL=Stark Lab <contact@starklab.jp>
CONTACT_NOTIFICATION_EMAIL=starklab.system@gmail.com
```

## ページ構成

| パス | 内容 |
|------|------|
| `/` | LP（ヒーロー〜お問い合わせ） |
| `/terms` | 利用規約 |
| `/privacy` | プライバシーポリシー |
| `/tokushoho` | 特定商取引法に基づく表記 |
| `/sitemap.xml` | サイトマップ |
| `/robots.txt` | robots |

## デプロイ（Vercel）

1. GitHub にリポジトリを push
2. [Vercel](https://vercel.com) で Import
3. 環境変数 `NEXT_PUBLIC_SITE_URL` を設定
4. Deploy

## スクリプト

```bash
npm run dev      # 開発サーバー
npm run build    # 本番ビルド
npm run start    # 本番起動
npm run lint     # ESLint
```
