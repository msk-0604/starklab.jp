import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-foreground text-background hover:bg-foreground/90 active:opacity-90",
  secondary:
    "bg-transparent text-foreground border border-foreground/30 hover:border-foreground hover:bg-foreground/[0.03] active:opacity-90",
  ghost: "bg-transparent text-foreground hover:bg-foreground/[0.04]",
};

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
  type?: never;
  disabled?: never;
  "data-track-cta"?: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 text-[14px] font-medium tracking-[0.04em] transition-colors duration-200 ease-out disabled:pointer-events-none disabled:opacity-60";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClass} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, ...linkRest } = props as ButtonAsLink & Record<string, unknown>;
    const {
      children: _c,
      variant: _v,
      className: _cl,
      ...domRest
    } = linkRest as ButtonAsLink & Record<string, unknown>;
    void _c;
    void _v;
    void _cl;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(domRest as Record<string, string>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(domRest as Record<string, string>)}>
        {children}
      </Link>
    );
  }

  const {
    type = "button",
    children: _c,
    variant: _v,
    className: _cl,
    ...rest
  } = props as ButtonAsButton & {
    children?: ReactNode;
    variant?: ButtonVariant;
    className?: string;
  };
  void _c;
  void _v;
  void _cl;

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
