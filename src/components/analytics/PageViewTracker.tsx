"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  /** Stored in meta.page_type — uses page_view for SEO Engine compatibility */
  pageType: "service" | "case_study" | "area" | "media_list" | "other";
  /** Optional stable key for session dedupe */
  dedupeKey?: string;
};

/**
 * One page_view per key per tab session.
 * service_page_view / case_study_view are expressed via meta.page_type
 * so SEO Engine ALLOWED_EVENT_NAMES stays unchanged.
 */
export function PageViewTracker({ pageType, dedupeKey }: Props) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    const key = `sl_pv_${dedupeKey || pageType}_${window.location.pathname}`;
    try {
      if (sessionStorage.getItem(key) === "1") return;
      sessionStorage.setItem(key, "1");
    } catch {
      // continue once
    }
    sent.current = true;
    void trackEvent({
      event_name: "page_view",
      meta: {
        page_type: pageType,
        ...(pageType === "service" ? { intent_event: "service_page_view" } : {}),
        ...(pageType === "case_study"
          ? { intent_event: "case_study_view" }
          : {}),
      },
    });
  }, [pageType, dedupeKey]);

  return null;
}
