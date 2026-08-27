/**
 * Safe production E2E probe for starklab analytics → SEO Engine → Supabase.
 * Does NOT print secrets. Uses identifiable TEST markers only.
 */
import { readFileSync, writeFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { createHash, randomUUID } from "crypto";

function loadEnv(path) {
  const m = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const i = line.indexOf("=");
    const n = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    m[n] = v;
  }
  return m;
}

const e = loadEnv("C:/dev/starklab/.env.local");
const secret = e.ANALYTICS_INGEST_SECRET?.trim();
const supabaseUrl = e.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceKey =
  e.SUPABASE_SERVICE_ROLE_KEY?.trim() || e.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const ingestBase =
  (e.ANALYTICS_INGEST_URL || e.NEXT_PUBLIC_SEO_ENGINE_URL || "https://stark-seo-engine.vercel.app").replace(
    /\/$/,
    "",
  );
const siteBase = "https://www.starklab.jp";

const RUN = `e2e_${Date.now().toString(36)}`;
const session_id = `s_starklab_e2e_${RUN}`;
const visitor_id = `v_starklab_e2e_${RUN}`;
const slug = "genba-kanri-system-comparison";
const path = `/media/${slug}`;
const event_id = `evt_${RUN}_${randomUUID().slice(0, 8)}`;

const report = {
  run: RUN,
  session_id,
  visitor_id,
  slug,
  secret_configured: Boolean(secret),
  secret_fp: secret
    ? createHash("sha256").update(secret).digest("hex").slice(0, 12)
    : null,
};

async function postSiteAnalytics(body) {
  const res = await fetch(`${siteBase}/api/analytics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  return { status: res.status, json };
}

async function postEngine(pathSuffix, body, withSecret) {
  const headers = { "Content-Type": "application/json" };
  if (withSecret) headers["x-analytics-secret"] = secret;
  const res = await fetch(`${ingestBase}${pathSuffix}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  return { status: res.status, json };
}

const baseMeta = {
  probe: true,
  e2e: "starklab_e2e",
  event_id,
  first_touch_slug: slug,
  last_touch_slug: slug,
  source_article_slug: slug,
  landing_page: path,
};

const events = [
  "media_view",
  "scroll_50",
  "scroll_90",
  "cta_click",
  "contact_start",
];

report.events = {};
for (const event_name of events) {
  const body = {
    event_name,
    path,
    article_slug: slug,
    session_id,
    visitor_id,
    duration_ms: 0,
    referrer: "https://www.google.com/",
    utm_source: "e2e_test",
    utm_medium: "seo_test",
    utm_campaign: "starklab_e2e",
    meta: { ...baseMeta, event_name },
  };
  report.events[event_name] = await postSiteAnalytics(body);
}

// Fail-closed checks (engine direct)
report.auth_no_secret = await postEngine(
  "/api/events",
  {
    event_name: "media_view",
    path,
    article_slug: slug,
    session_id: `${session_id}_nosec`,
  },
  false,
);
report.auth_bad_secret = await (async () => {
  const headers = {
    "Content-Type": "application/json",
    "x-analytics-secret": "definitely-wrong-secret",
  };
  const res = await fetch(`${ingestBase}/api/events`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      event_name: "media_view",
      path,
      article_slug: slug,
      session_id: `${session_id}_badsec`,
    }),
  });
  return { status: res.status };
})();

// Leads: call SEO Engine directly (bypasses Resend / customer email)
report.lead = await postEngine(
  "/api/leads",
  {
    topic: "E2E_TEST other",
    company: "E2E_TEST starklab_e2e",
    name: "E2E_TEST",
    email: "e2e_test+starklab_e2e@example.com",
    phone: null,
    message: "E2E_TEST starklab_e2e — ignore / safe probe only",
    article_slug: slug,
    first_touch_slug: slug,
    last_touch_slug: slug,
    landing_path: `${path}?utm_source=e2e_test&utm_medium=seo_test&utm_campaign=starklab_e2e`,
    referrer: "https://www.google.com/",
    utm_source: "e2e_test",
    utm_medium: "seo_test",
    utm_campaign: "starklab_e2e",
    session_id,
    visitor_id,
  },
  true,
);

// Persistence checks
const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: rows, error: evErr } = await supabase
  .from("site_events")
  .select(
    "event_name,path,article_slug,session_id,referrer,utm_source,utm_medium,utm_campaign,meta,occurred_at",
  )
  .eq("session_id", session_id)
  .order("occurred_at", { ascending: true });

report.site_events_error = evErr ? "ERROR" : null;
report.site_events_count = rows?.length ?? 0;
report.site_events_names = [...new Set((rows ?? []).map((r) => r.event_name))];
report.site_events_sample = (rows ?? []).map((r) => ({
  event_name: r.event_name,
  path: r.path,
  article_slug: r.article_slug,
  has_session: Boolean(r.session_id),
  utm_source: r.utm_source,
  utm_medium: r.utm_medium,
  utm_campaign: r.utm_campaign,
  meta_scroll: r.meta?.scroll ?? null,
  meta_visitor: Boolean(r.meta?.visitor_id),
  meta_event_id: Boolean(r.meta?.event_id),
  occurred_at: r.occurred_at,
}));

const { data: inquiries, error: inqErr } = await supabase
  .from("contact_inquiries")
  .select(
    "company,name,email,article_slug,first_touch_slug,last_touch_slug,landing_path,utm_source,utm_medium,utm_campaign,created_at",
  )
  .eq("email", "e2e_test+starklab_e2e@example.com")
  .order("created_at", { ascending: false })
  .limit(3);

report.contact_inquiries_error = inqErr ? "ERROR" : null;
report.contact_inquiries_count = inquiries?.length ?? 0;
report.contact_inquiries_ok = (inquiries ?? []).some(
  (r) =>
    r.article_slug === slug &&
    r.first_touch_slug === slug &&
    r.utm_source === "e2e_test",
);

const { data: conversions, error: convErr } = await supabase
  .from("conversion_events")
  .select("event_type,source_url,utm_source,utm_campaign,notes,occurred_at")
  .ilike("notes", `%${visitor_id}%`)
  .order("occurred_at", { ascending: false })
  .limit(3);

report.conversion_events_error = convErr ? "ERROR" : null;
report.conversion_events_count = conversions?.length ?? 0;
report.conversion_has_visitor = (conversions ?? []).some((c) =>
  (c.notes || "").includes(visitor_id),
);

// Attribution column presence
const { error: attrColErr } = await supabase
  .from("contact_inquiries")
  .select(
    "article_slug,landing_path,first_touch_slug,last_touch_slug,utm_source,utm_medium,utm_campaign",
  )
  .limit(1);
report.attribution_cols = attrColErr ? "MISSING" : "EXISTS";

writeFileSync(
  "C:/dev/starklab/scripts/.e2e-last-report.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
