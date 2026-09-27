"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

/** おしゃれなSIIG型ヒーロー：個性書体・軽量グラフィック・必要時のみポインター反応 */
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
    let running = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let idleFrames = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      graphic.style.transform = `translate3d(${currentX * 16}px, ${currentY * 10}px, 0)`;

      const settled =
        Math.abs(targetX - currentX) < 0.002 && Math.abs(targetY - currentY) < 0.002;
      if (settled) {
        idleFrames += 1;
        if (idleFrames > 8) {
          running = false;
          return;
        }
      } else {
        idleFrames = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      idleFrames = 0;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      start();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerleave", onLeave);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#f7f8fc] pt-16 sm:pt-[4.25rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_85%_60%_at_50%_-15%,#d9e6ff_0%,transparent_52%),linear-gradient(165deg,#f7f8fc_0%,#ffffff_48%,#eef2f9_100%)]"
        aria-hidden="true"
      />

      <div
        ref={graphicRef}
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        aria-hidden="true"
      >
        <div className="siig-hero-grid-light absolute inset-0 opacity-40" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1d4ed8]/12 sm:h-96 sm:w-96" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#0ea5e9]/10 sm:h-[26rem] sm:w-[26rem]" />
        <div className="absolute left-1/2 top-[44%] h-[min(68vw,30rem)] w-[min(68vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1d4ed8]/18" />
        <div className="absolute left-1/2 top-[44%] h-[min(82vw,38rem)] w-[min(82vw,38rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.07]" />
        <div className="absolute left-[7%] right-[7%] top-[17%] h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
        <div className="absolute bottom-[15%] left-[7%] right-[7%] h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        <div className="absolute left-5 top-20 h-11 w-11 border-l border-t border-foreground/25 sm:left-10 sm:top-24 sm:h-14 sm:w-14" />
        <div className="absolute right-5 top-20 h-11 w-11 border-r border-t border-foreground/25 sm:right-10 sm:top-24 sm:h-14 sm:w-14" />
        <div className="absolute bottom-10 left-5 h-11 w-11 border-b border-l border-foreground/25 sm:bottom-14 sm:left-10 sm:h-14 sm:w-14" />
        <div className="absolute bottom-10 right-5 h-11 w-11 border-b border-r border-foreground/25 sm:bottom-14 sm:right-10 sm:h-14 sm:w-14" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="hero-line hero-line-1 font-display text-[11px] font-semibold uppercase tracking-[0.38em] text-accent sm:text-xs">
          {siteConfig.nameJa}
        </p>

        <div className="hero-line hero-line-2 mt-6 h-px w-14 bg-accent" />

        <h1 className="hero-line hero-line-3 mt-8 font-display text-[clamp(3.5rem,13vw,8.75rem)] font-extrabold leading-[0.86] tracking-[-0.045em] text-foreground">
          Stark
          <span className="block sm:inline"> Lab</span>
        </h1>

        <p className="hero-line hero-line-4 mt-9 max-w-lg text-[15px] font-medium leading-relaxed text-muted sm:mt-10 sm:text-lg">
          {siteConfig.tagline}
        </p>

        <div className="hero-line hero-line-5 mt-14 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <Button
            href="/#project"
            className="w-full !rounded-none !px-9 !py-4 font-display text-sm tracking-[0.08em] sm:w-auto"
          >
            KENBEIを見る
          </Button>
          <Button
            href="/#contact"
            variant="secondary"
            className="w-full !rounded-none !border-foreground/25 !px-9 !py-4 font-display text-sm tracking-[0.08em] sm:w-auto"
          >
            お問い合わせ
          </Button>
        </div>

        <p className="hero-line hero-line-6 mt-16 font-display text-[10px] font-semibold uppercase tracking-[0.4em] text-muted">
          Scroll
        </p>
      </div>
    </section>
  );
}
