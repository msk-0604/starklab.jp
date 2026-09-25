"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

/** 高級感あるSIIG型ヒーロー：大タイポ・シネマティック入場・繊細な幾何 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const graphicRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const graphic = graphicRef.current;
    const title = titleRef.current;
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
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      const scrollY = window.scrollY;
      const parallax = Math.min(scrollY * 0.22, 100);
      graphic.style.transform = `translate3d(${currentX * 28}px, ${parallax + currentY * 18}px, 0) scale(${1 + Math.abs(currentX) * 0.01})`;
      if (title) {
        title.style.transform = `translate3d(${currentX * -6}px, ${currentY * -4}px, 0)`;
      }
      section.style.setProperty("--hero-progress", String(Math.min(scrollY / 480, 1)));
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
      className="hero-stage relative isolate min-h-[100svh] overflow-hidden bg-[#f7f8fb] pt-16 sm:pt-[4.25rem]"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,#dbe7ff_0%,transparent_55%),linear-gradient(180deg,#f7f8fb_0%,#ffffff_55%,#f4f6fa_100%)]"
        aria-hidden="true"
      />

      <div
        ref={graphicRef}
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
        aria-hidden="true"
      >
        <div className="siig-hero-grid-light absolute inset-0 opacity-50" />
        <div className="siig-orb siig-orb-a absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#2563eb]/18 blur-[90px]" />
        <div className="siig-orb siig-orb-b absolute -right-32 bottom-[-10%] h-[32rem] w-[32rem] rounded-full bg-[#0ea5e9]/16 blur-[100px]" />
        <div className="siig-ring absolute left-1/2 top-[42%] h-[min(72vw,34rem)] w-[min(72vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2563eb]/15" />
        <div className="siig-ring siig-ring-delayed absolute left-1/2 top-[42%] h-[min(86vw,42rem)] w-[min(86vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/[0.06]" />
        <div className="siig-hairline absolute left-[6%] right-[6%] top-[18%] h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        <div className="siig-hairline siig-hairline-b absolute bottom-[16%] left-[6%] right-[6%] h-px bg-gradient-to-r from-transparent via-foreground/12 to-transparent" />
        <div className="siig-corner absolute left-5 top-20 h-10 w-10 border-l border-t border-foreground/20 sm:left-10 sm:top-24 sm:h-14 sm:w-14" />
        <div className="siig-corner absolute right-5 top-20 h-10 w-10 border-r border-t border-foreground/20 sm:right-10 sm:top-24 sm:h-14 sm:w-14" />
        <div className="siig-corner absolute bottom-10 left-5 h-10 w-10 border-b border-l border-foreground/20 sm:bottom-14 sm:left-10 sm:h-14 sm:w-14" />
        <div className="siig-corner absolute bottom-10 right-5 h-10 w-10 border-b border-r border-foreground/20 sm:bottom-14 sm:right-10 sm:h-14 sm:w-14" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4.25rem)] max-w-5xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <p className="hero-line hero-line-1 text-[11px] font-semibold uppercase tracking-[0.42em] text-accent sm:text-xs">
          {siteConfig.nameJa}
        </p>

        <div className="hero-line hero-line-2 mt-6 h-px w-12 bg-accent/70 sm:w-16" />

        <h1
          ref={titleRef}
          className="hero-line hero-line-3 mt-8 font-display text-[clamp(3.4rem,12vw,8.5rem)] font-bold leading-[0.88] tracking-[-0.04em] text-foreground will-change-transform"
        >
          {siteConfig.name}
        </h1>

        <p className="hero-line hero-line-4 mt-8 max-w-xl text-[15px] leading-relaxed tracking-wide text-muted sm:mt-10 sm:text-lg">
          {siteConfig.tagline}
        </p>

        <div className="hero-line hero-line-5 mt-14 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
          <Button href="/#project" className="w-full !rounded-none !px-9 !py-4 tracking-wide sm:w-auto">
            KENBEIを見る
          </Button>
          <Button
            href="/#contact"
            variant="secondary"
            className="w-full !rounded-none !border-foreground/20 !px-9 !py-4 tracking-wide sm:w-auto"
          >
            お問い合わせ
          </Button>
        </div>

        <p className="hero-line hero-line-6 mt-16 flex flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-[0.45em] text-muted/80">
          <span className="siig-scroll-line block h-10 w-px bg-gradient-to-b from-accent to-transparent" />
          Scroll
        </p>
      </div>
    </section>
  );
}
