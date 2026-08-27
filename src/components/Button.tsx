import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-[var(--shadow-cta)] hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "bg-white text-foreground border border-border hover:bg-surface shadow-[var(--shadow-card)]",
  ghost: "bg-transparent text-accent hover:bg-accent-soft",
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
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold tracking-tight transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-60";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "" } = props;
  const classes = `${baseClass} ${variants[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, children: _children, variant: _variant, className: _className, ...rest } =
      props as ButtonAsLink & Record<string, unknown>;
    void _children;
    void _variant;
    void _className;
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          {...(rest as Record<string, string>)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as Record<string, string>)}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
