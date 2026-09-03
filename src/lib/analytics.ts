import {
  getAttributionSnapshot,
  resolveSourceArticleSlug,
  type AttributionSnapshot,
} from "@/lib/attribution";

export type AnalyticsEventName =
  | "media_view"
  | "cta_click"
  | "media_to_service"
  | "contact_start"
  | "contact_submit"
  | "scroll_50"
  | "scroll_90"
  | "media_engage"
  | "page_view";

export type TrackPayload = {
  event_name: AnalyticsEventName;
  article_slug?: string | null;
  article_id?: string | null;
  page_path?: string;
  duration_ms?: number;
  meta?: Record<string, unknown>;
  /** Skip first-party ingest (e.g. contact_submit already sent via /api/leads). GA4 still fires. */
  skipIngest?: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function sendToGa4(
  event: AnalyticsEventName,
  params: Record<string, unknown>,
) {
  try {
    if (typeof window.gtag !== "function") return;
    // PII禁止: email / name / phone / company は送らない
    const safe: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(params)) {
      if (v == null || v === "") continue;
      if (/email|name|phone|company|message/i.test(k)) continue;
      safe[k] = v;
    }
    window.gtag("event", event, safe);
  } catch {
    // GA optional
  }
}

/** Fire-and-forget first-party event (+ optional GA4). Never throws. */
export async function trackEvent(payload: TrackPayload): Promise<void> {
  if (typeof window === "undefined") return;

  const attr: AttributionSnapshot = getAttributionSnapshot();
  const page_path = payload.page_path ?? window.location.pathname;
  const article_slug =
    payload.article_slug ??
    (page_path.match(/\/media\/([a-z0-9-]+)/i)?.[1] ?? null) ??
    resolveSourceArticleSlug(attr);

  const body = {
    event_name: payload.event_name,
    path: page_path,
    article_slug,
    article_id: payload.article_id ?? null,
    session_id: attr.session_id,
    visitor_id: attr.visitor_id,
    duration_ms: payload.duration_ms ?? 0,
    referrer: document.referrer || attr.referrer,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
    utm_term: attr.utm_term,
    utm_content: attr.utm_content,
    meta: {
      landing_page: attr.landing_page,
      first_touch_slug: attr.first_touch_slug,
      last_touch_slug: attr.last_touch_slug,
      source_article_slug: resolveSourceArticleSlug(attr),
      ...(payload.meta ?? {}),
    },
  };

  sendToGa4(payload.event_name, {
    page_path: body.path,
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    article_slug: body.article_slug,
    utm_source: body.utm_source,
    utm_medium: body.utm_medium,
    utm_campaign: body.utm_campaign,
    utm_term: body.utm_term,
    utm_content: body.utm_content,
    ...(payload.meta?.page_type ? { page_type: payload.meta.page_type } : {}),
    ...(payload.event_name === "contact_submit" ? { conversion: true } : {}),
  });

  if (payload.skipIngest) return;

  try {
    const res = await fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
    if (!res.ok) {
      // swallow — analytics must not break UX
    }
  } catch {
    // offline / blocked
  }
}
