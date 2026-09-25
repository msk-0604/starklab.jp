import Image from "next/image";

type ProjectBrandPanelProps = {
  title: string;
  category: string;
  subtitle?: string;
  /** 正式ブランドロゴ（改変しない） */
  logoSrc?: string | null;
  className?: string;
  /** 詳細ヒーローなど大きめ表示 */
  size?: "card" | "hero";
};

/** 正式キャプチャ未入手時のブランド表示（偽UIは使わない） */
export function ProjectBrandPanel({
  title,
  category,
  subtitle = "Stark Lab 自社開発サービス",
  logoSrc,
  className = "",
  size = "card",
}: ProjectBrandPanelProps) {
  const isHero = size === "hero";
  const logoBox = isHero
    ? "h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40"
    : "h-20 w-20 sm:h-24 sm:w-24";

  return (
    <div
      className={`flex h-full min-h-[12rem] flex-col justify-between bg-gradient-to-br from-surface via-white to-accent-soft p-6 sm:min-h-[14rem] sm:p-8 ${className}`}
      role="img"
      aria-label={`${title}（${category}）`}
    >
      <p className="text-xs font-semibold tracking-wide text-accent sm:text-sm">
        {category}
      </p>

      <div
        className={`flex flex-1 flex-col items-center justify-center gap-4 py-4 sm:gap-5 ${
          isHero ? "sm:py-6" : "sm:py-2"
        }`}
      >
        {logoSrc ? (
          <div className={`relative shrink-0 ${logoBox}`}>
            <Image
              src={logoSrc}
              alt={`${title}のロゴ`}
              fill
              sizes={
                isHero
                  ? "(max-width: 640px) 112px, (max-width: 768px) 144px, 160px"
                  : "(max-width: 640px) 80px, 96px"
              }
              className="object-contain drop-shadow-[0_8px_24px_rgba(15,23,42,0.14)]"
              priority={isHero}
            />
          </div>
        ) : null}
        <div className="text-center">
          <p
            className={`font-display font-bold tracking-tight text-foreground ${
              isHero
                ? "text-2xl sm:text-3xl md:text-4xl"
                : "text-xl sm:text-2xl"
            }`}
          >
            {title}
          </p>
          <p className="mt-2 text-sm text-muted sm:text-[15px]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}
