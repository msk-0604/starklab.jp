"use client";

import { useEffect, useRef } from "react";
import { touchMediaArticle } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

type Props = {
  slug: string;
  articleId?: string;
  ctaSelector?: string;
};

/**
 * One media_view per slug per page lifecycle (Strict Mode safe via session flag).
 * Scroll depth + CTA clicks + engage duration on unload.
 */
export function MediaTracker({ slug, articleId }: Props) {
  const viewedRef = useRef(false);
  const scroll50Ref = useRef(false);
  const scroll90Ref = useRef(false);
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    const key = `sl_mv_${slug}`;
    let already = false;
    try {
      already = sessionStorage.getItem(key) === "1";
    } catch {
      already = false;
    }

    touchMediaArticle(slug);

    if (!already && !viewedRef.current) {
      viewedRef.current = true;
      try {
        sessionStorage.setItem(key, "1");
      } catch {
        // ignore
      }
      void trackEvent({
        event_name: "media_view",
        article_slug: slug,
        article_id: articleId,
      });
    }

    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      const ratio = window.scrollY / max;
      if (ratio >= 0.5 && !scroll50Ref.current) {
        scroll50Ref.current = true;
        void trackEvent({
          event_name: "scroll_50",
          article_slug: slug,
          article_id: articleId,
        });
      }
      if (ratio >= 0.9 && !scroll90Ref.current) {
        scroll90Ref.current = true;
        void trackEvent({
          event_name: "scroll_90",
          article_slug: slug,
          article_id: articleId,
        });
      }
    };

    const onCtaClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest("a,button") as HTMLElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const isCta =
        a.hasAttribute("data-track-cta") ||
        href.includes("#contact") ||
        href.includes("/contact") ||
        /相談|問い合わせ|お問い合わせ/.test(a.textContent || "");
      const isService =
        href.includes("/services") || a.hasAttribute("data-track-service");
      if (isCta) {
        void trackEvent({
          event_name: "cta_click",
          article_slug: slug,
          article_id: articleId,
          meta: { href },
        });
      } else if (isService) {
        void trackEvent({
          event_name: "media_to_service",
          article_slug: slug,
          article_id: articleId,
          meta: { href },
        });
      }
    };

    const flushEngage = () => {
      const duration_ms = Math.min(Date.now() - startedAt.current, 3_600_000);
      if (duration_ms < 3000) return;
      void trackEvent({
        event_name: "media_engage",
        article_slug: slug,
        article_id: articleId,
        duration_ms,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onCtaClick);
    window.addEventListener("pagehide", flushEngage);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onCtaClick);
      window.removeEventListener("pagehide", flushEngage);
      flushEngage();
    };
  }, [slug, articleId]);

  return null;
}
