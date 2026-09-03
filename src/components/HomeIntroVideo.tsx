"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const VIDEO_SRC = "/video/stark-lab-signature.mp4";
const SESSION_KEY = "starklab-intro-seen";

function getSkipIntro(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function HomeIntroVideo() {
  const skipIntro = useSyncExternalStore(
    () => () => {},
    getSkipIntro,
    () => true,
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const [exiting, setExiting] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const finish = useCallback(() => {
    if (exiting || dismissed) return;
    setExiting(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
    window.setTimeout(() => setDismissed(true), 520);
  }, [dismissed, exiting]);

  useEffect(() => {
    if (skipIntro || dismissed) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [skipIntro, dismissed]);

  useEffect(() => {
    if (skipIntro || dismissed || exiting) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch(() => finish());
  }, [skipIntro, dismissed, exiting, finish]);

  if (skipIntro || dismissed) return null;

  return (
    <div
      className={`intro-video fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-500 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Stark Lab イントロ"
    >
      <video
        ref={videoRef}
        className="intro-video__player h-full max-h-[100dvh] w-full max-w-[100vw] object-contain"
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      />

      <button
        type="button"
        onClick={finish}
        className="absolute right-5 top-5 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-black/60 sm:right-8 sm:top-8"
      >
        スキップ
      </button>
    </div>
  );
}
