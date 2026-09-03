"use client";

import { useEffect } from "react";
import { initAttributionFromLocation, resolveSourceArticleSlug, getAttributionSnapshot } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";

/** Captures UTM / landing / session once per mount + sitewide CTA clicks. */
export function AnalyticsBootstrap() {
  useEffect(() => {
    initAttributionFromLocation();

    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const a = t.closest("a,button") as HTMLElement | null;
      if (!a) return;

      // Media pages already track via MediaTracker — avoid double fire
      if (window.location.pathname.startsWith("/media/")) return;

      const href = a.getAttribute("href") || "";
      const isCta =
        a.hasAttribute("data-track-cta") ||
        href.includes("#contact") ||
        /相談|問い合わせ|お問い合わせ/.test(a.textContent || "");
      if (!isCta) return;

      const attr = getAttributionSnapshot();
      void trackEvent({
        event_name: "cta_click",
        article_slug: resolveSourceArticleSlug(attr),
        meta: {
          href: href || undefined,
          cta: a.getAttribute("data-track-cta") || "auto",
          inquiry_intent: href.includes("#contact") || href.includes("/#contact"),
        },
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
