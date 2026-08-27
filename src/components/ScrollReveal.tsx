"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: "div" | "section" | "article" | "li";
  /** Premium entrance: blur + lift (default) or slide */
  variant?: "lift" | "fade" | "clip";
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "lift",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
  const variantClass =
    variant === "clip" ? "reveal-clip" : variant === "fade" ? "reveal-fade" : "reveal";

  return (
    <Tag
      ref={ref as never}
      className={`${variantClass} ${delayClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
