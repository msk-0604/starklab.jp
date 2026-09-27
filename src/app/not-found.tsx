import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-28 text-center sm:px-8">
      <p className="text-sm font-semibold tracking-wide text-accent">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        ページが見つかりません
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
        URLが間違っているか、ページが移動した可能性があります。
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">トップへ戻る</Button>
        <Button href="/#contact" variant="secondary">
          お問い合わせ
        </Button>
      </div>
      <p className="mt-8 text-sm text-muted">
        <Link href="/services" className="hover:text-foreground">
          サービス
        </Link>
        {" · "}
        <Link href="/works" className="hover:text-foreground">
          実績
        </Link>
        {" · "}
        <Link href="/media" className="hover:text-foreground">
          Media
        </Link>
      </p>
    </main>
  );
}
