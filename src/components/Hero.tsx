"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const grid = gridRef.current;
    if (!section || !media || !grid) return;

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
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      const scrollY = window.scrollY;
      const parallax = Math.min(scrollY * 0.22, 120);
      media.style.transform = `translate3d(${currentX * 10}px, ${parallax + currentY * 8}px, 0) scale(1.06)`;
      grid.style.transform = `translate3d(${currentX * -14}px, ${currentY * -10}px, 0)`;
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
      className="hero-stage relative isolate min-h-[88vh] overflow-hidden pt-16 sm:pt-[4.25rem]"
    >
      <div ref={mediaRef} className="hero-media absolute inset-0 -z-20 will-change-transform">
        <Image
          src="/images/hero-system.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/93 to-white/45 sm:via-white/90 sm:to-white/30"
        aria-hidden="true"
      />
      <div
        ref={gridRef}
        className="hero-grid absolute inset-0 -z-10 opacity-70 will-change-transform"
        aria-hidden="true"
      />
      <div className="hero-scan absolute inset-x-0 top-0 -z-10 h-px" aria-hidden="true" />

      <div className="mx-auto flex min-h-[calc(88vh-4.25rem)] max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="hero-line hero-line-1 text-sm font-medium tracking-wide text-accent">
            {siteConfig.nameJa} ／ 日本全国どこでも
          </p>
          <h1 className="hero-line hero-line-2 mt-4 font-display text-[1.9rem] font-bold leading-[1.22] tracking-tight text-foreground sm:text-4xl sm:leading-[1.18] lg:text-[2.75rem]">
            {siteConfig.tagline}
          </h1>
          <p className="hero-line hero-line-3 mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {siteConfig.description}
          </p>
          <div className="hero-line hero-line-4 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#contact" className="min-w-[210px] !py-4">
              無料で相談する
            </Button>
            <Button href="/services" variant="secondary" className="min-w-[180px] !py-4">
              サービスを見る
            </Button>
          </div>
          <p className="hero-line hero-line-5 mt-4 text-sm text-muted">
            {siteConfig.responseNote}
          </p>
        </div>
      </div>
    </section>
  );
}
