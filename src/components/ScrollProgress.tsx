"use client";

import { useEffect, useState } from "react";

/** Thin top progress bar — reads as engineered polish, not decoration. */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(doc.scrollTop / max, 1) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent/90 transition-transform duration-75 ease-out"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
