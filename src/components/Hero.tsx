"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

/** SIIG型ヒーロー：大タイポ＋幾何グラフィック＋入場モーション（ライト基調） */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const graphic = graphicRef.current;
    if (!section || !graphic) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      const scrollY = window.scrollY;
      const parallax = Math.min(scrollY * 0.18, 80);
      graphic.style.transform = `translate3d(${currentX * 20}px, ${parallax + currentY * 14}px, 0)`;
      section.style.setProperty("--hero-progress", String(Math.min(scrollY / 420, 1)));
      raf = requestAnimationFrame(tick);
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-stage relative isolate min-h-[92vh] overflow-hidden bg-gradient-to-b from-[#eef4ff] via-white to-white pt-16 sm:pt-[4.25rem]"
    >
      <div
        ref={graphicRef}
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        aria-hidden="true"
      >
        <div className="siig-hero-grid-light absolute inset-0 opacity-70" />
        <div className="siig-orb siig-orb-a absolute -left-28 top-16 h-80 w-80 rounded-full bg-[#2563eb]/20 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
        <div className="siig-orb siig-orb-b absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#38bdf8]/25 blur-3xl sm:h-[32rem] sm:w-[32rem]" />
        <div className="siig-slash absolute right-[10%] top-[20%] hidden h-56 w-2.5 rotate-[18deg] bg-gradient-to-b from-accent to-transparent sm:block" />
        <div className="siig-slash absolute right-[14%] top-[26%] hidden h-40 w-1.5 rotate-[18deg] bg-gradient-to-b from-foreground/25 to-transparent sm:block" />
        <div className="siig-frame absolute inset-x-4 inset-y-16 border border-foreground/8 sm:inset-x-8 sm:inset-y-20 md:inset-x-12" />
        <div className="absolute bottom-[18%] left-[8%] hidden h-24 w-24 border border-accent/30 sm:block" />
        <div className="absolute bottom-[22%] left-[11%] hidden h-16 w-16 bg-accent/10 sm:block" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(92vh-4.25rem)] max-w-4xl flex-col items-center justify-center px-5 py-20 text-center sm:px-8 sm:py-28">
        <p className="hero-line hero-line-1 text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
          {siteConfig.nameJa}
        </p>
        <h1 className="hero-line hero-line-2 mt-5 font-display text-[3.4rem] font-bold leading-[0.92] tracking-tight text-foreground sm:text-7xl md:text-8xl">
          {siteConfig.name}
        </h1>
        <p className="hero-line hero-line-3 mt-7 max-w-md text-base leading-relaxed text-muted sm:max-w-lg sm:text-lg">
          {siteConfig.tagline}
        </p>
        <div className="hero-line hero-line-4 mt-12 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Button href="/#project" className="w-full sm:w-auto">
            KENBEIを見る
          </Button>
          <Button href="/#contact" variant="secondary" className="w-full sm:w-auto">
            お問い合わせ
          </Button>
        </div>
        <p className="hero-line hero-line-5 mt-10 text-[11px] font-medium uppercase tracking-[0.35em] text-muted">
          Scroll
        </p>
      </div>
    </section>
  );
}
