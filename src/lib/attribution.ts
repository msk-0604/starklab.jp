/** Client-side attribution (minimal PII). localStorage / sessionStorage only. */

export type AttributionSnapshot = {
  visitor_id: string;
  session_id: string;
  first_touch_slug: string | null;
  last_touch_slug: string | null;
  first_seen_at: string | null;
  last_seen_at: string | null;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
};

const VISITOR_KEY = "sl_vid";
const SESSION_KEY = "sl_sid";
const ATTR_KEY = "sl_attr";
const SESSION_MS = 30 * 60 * 1000;

function rid(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // private mode / quota — ignore
  }
}

type StoredAttr = {
  first_touch_slug: string | null;
  last_touch_slug: string | null;
  first_seen_at: string | null;
  last_seen_at: string | null;
  landing_page: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
};

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = rid("v");
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const now = Date.now();
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; t: number };
      if (parsed.id && now - parsed.t < SESSION_MS) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id: parsed.id, t: now }));
        return parsed.id;
      }
    }
  } catch {
    // continue
  }
  const id = rid("s");
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, t: now }));
  } catch {
    // ignore
  }
  return id;
}

function parseUtm(search: string): Partial<StoredAttr> {
  const q = new URLSearchParams(search);
  return {
    utm_source: q.get("utm_source"),
    utm_medium: q.get("utm_medium"),
    utm_campaign: q.get("utm_campaign"),
    utm_term: q.get("utm_term"),
    utm_content: q.get("utm_content"),
  };
}

/** Call once on app load (client). Captures UTM + landing. */
export function initAttributionFromLocation(): AttributionSnapshot {
  const visitor_id = getVisitorId();
  const session_id = getSessionId();
  const now = new Date().toISOString();
  const prev = readJson<StoredAttr>(ATTR_KEY) ?? {
    first_touch_slug: null,
    last_touch_slug: null,
    first_seen_at: null,
    last_seen_at: null,
    landing_page: null,
    referrer: null,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
    utm_term: null,
    utm_content: null,
  };

  const utm = parseUtm(window.location.search);
  const hasUtm = Object.values(utm).some(Boolean);

  const next: StoredAttr = {
    ...prev,
    first_seen_at: prev.first_seen_at ?? now,
    last_seen_at: now,
    landing_page: prev.landing_page ?? window.location.pathname,
    referrer: prev.referrer ?? (document.referrer || null),
  };

  if (hasUtm) {
    next.utm_source = next.utm_source ?? utm.utm_source ?? null;
    next.utm_medium = next.utm_medium ?? utm.utm_medium ?? null;
    next.utm_campaign = next.utm_campaign ?? utm.utm_campaign ?? null;
    next.utm_term = next.utm_term ?? utm.utm_term ?? null;
    next.utm_content = next.utm_content ?? utm.utm_content ?? null;
  }

  writeJson(ATTR_KEY, next);
  return { visitor_id, session_id, ...next };
}

/** Record media article view for first/last touch (slug only, no PII). */
export function touchMediaArticle(slug: string): AttributionSnapshot {
  const base = initAttributionFromLocation();
  const now = new Date().toISOString();
  const next: StoredAttr = {
    first_touch_slug: base.first_touch_slug ?? slug,
    last_touch_slug: slug,
    first_seen_at: base.first_seen_at ?? now,
    last_seen_at: now,
    landing_page: base.landing_page,
    referrer: base.referrer,
    utm_source: base.utm_source,
    utm_medium: base.utm_medium,
    utm_campaign: base.utm_campaign,
    utm_term: base.utm_term,
    utm_content: base.utm_content,
  };
  writeJson(ATTR_KEY, next);
  return {
    visitor_id: base.visitor_id,
    session_id: base.session_id,
    ...next,
  };
}

export function getAttributionSnapshot(): AttributionSnapshot {
  if (typeof window === "undefined") {
    return {
      visitor_id: "",
      session_id: "",
      first_touch_slug: null,
      last_touch_slug: null,
      first_seen_at: null,
      last_seen_at: null,
      landing_page: null,
      referrer: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
      utm_term: null,
      utm_content: null,
    };
  }
  return initAttributionFromLocation();
}

/** Prefer last media touch, then first — for contact attribution. */
export function resolveSourceArticleSlug(attr?: AttributionSnapshot): string | null {
  const a = attr ?? getAttributionSnapshot();
  return a.last_touch_slug || a.first_touch_slug || null;
}
