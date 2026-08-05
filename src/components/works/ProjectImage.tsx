import Image from "next/image";

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

/**
 * 実績画像。SVGプレースホルダと本番のJPG/PNG両対応。
 * 遅延読み込みは next/image / img の loading="lazy" で実施。
 */
export function ProjectImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
  fill = false,
  width,
  height,
}: ProjectImageProps) {
  const isSvg = src.endsWith(".svg");

  if (isSvg) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- SVG placeholders
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element -- SVG placeholders
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1600}
      height={height ?? 1000}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
    />
  );
}
