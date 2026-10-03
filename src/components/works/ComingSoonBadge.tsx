/** 公開準備中のプロジェクトに付けるバッジ */
export function ComingSoonBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-accent/40 bg-accent-soft px-2.5 py-0.5 align-middle text-[11px] font-semibold uppercase tracking-[0.12em] text-accent ${className}`}
    >
      Coming Soon
    </span>
  );
}
