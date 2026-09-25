type ProjectBrandPanelProps = {
  title: string;
  category: string;
  subtitle?: string;
  className?: string;
};

/** 正式キャプチャ未入手時のブランド表示（偽UIは使わない） */
export function ProjectBrandPanel({
  title,
  category,
  subtitle = "Stark Lab 自社開発サービス",
  className = "",
}: ProjectBrandPanelProps) {
  return (
    <div
      className={`flex h-full min-h-[12rem] flex-col justify-between bg-gradient-to-br from-surface via-white to-accent-soft p-6 sm:min-h-[14rem] sm:p-8 ${className}`}
      role="img"
      aria-label={`${title}（${category}）`}
    >
      <p className="text-xs font-semibold tracking-wide text-accent sm:text-sm">
        {category}
      </p>
      <div>
        <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </p>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
      </div>
    </div>
  );
}
