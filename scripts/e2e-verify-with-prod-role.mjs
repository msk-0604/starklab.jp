/**
 * Compare local vs pulled prod env (flags/sameness only) and verify E2E rows via service role.
 */
import { readFileSync, existsSync, unlinkSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import { createClient } from "@supabase/supabase-js";

function loadEnv(path) {
  const m = {};
  if (!existsSync(path)) return m;
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

function st(v) {
  if (v === undefined || v === null) return "MISSING";
  if (!String(v).trim()) return "EMPTY";
  return "CONFIGURED";
}

function fp(v) {
  if (!v) return null;
  return createHash("sha256").update(String(v)).digest("hex").slice(0, 12);
}

const local = loadEnv("C:/dev/starklab/.env.local");
const prod = loadEnv("C:/dev/starklab/.env.vercel.prod.check");

const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANALYTICS_INGEST_SECRET",
  "ANALYTICS_INGEST_URL",
  "NEXT_PUBLIC_SEO_ENGINE_URL",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
];

const out = { env: {} };
for (const k of keys) {
  const la = local[k];
  const lb = prod[k];
  out.env[k] = {
    local: st(la),
    prod: st(lb),
    same:
      la && lb ? (la === lb ? "SAME" : "DIFFERENT") : "N/A",
  };
}

const url = prod.NEXT_PUBLIC_SUPABASE_URL || local.NEXT_PUBLIC_SUPABASE_URL;
const key = prod.SUPABASE_SERVICE_ROLE_KEY || local.SUPABASE_SERVICE_ROLE_KEY;
out.reader = key && prod.SUPABASE_SERVICE_ROLE_KEY ? "PROD_SERVICE_ROLE" : key ? "LOCAL_SERVICE_ROLE" : "NONE";

if (!url || !key) {
  out.db = "BLOCKED_NO_SERVICE_ROLE";
  console.log(JSON.stringify(out, null, 2));
  process.exit(0);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const sessionPrefix = "s_starklab_e2e_";
const { data: rows, error } = await supabase
  .from("site_events")
  .select(
    "event_name,path,article_slug,session_id,utm_source,utm_medium,utm_campaign,meta,occurred_at",
  )
  .like("session_id", `${sessionPrefix}%`)
  .order("occurred_at", { ascending: false })
  .limit(30);

out.site_events_error = error ? error.message.slice(0, 120) : null;
out.site_events_count = rows?.length ?? 0;
out.site_events_names = [...new Set((rows ?? []).map((r) => r.event_name))];
out.site_events_sessions = [...new Set((rows ?? []).map((r) => r.session_id))];
out.site_events_summary = (rows ?? []).map((r) => ({
  event_name: r.event_name,
  article_slug: r.article_slug,
  path_ok: r.path?.includes("/media/"),
  utm_source: r.utm_source,
  meta_scroll: r.meta?.scroll ?? null,
  meta_visitor: Boolean(r.meta?.visitor_id),
  meta_e2e: r.meta?.e2e ?? null,
  occurred_at: r.occurred_at,
}));

const { data: inquiries, error: inqErr } = await supabase
  .from("contact_inquiries")
  .select(
    "company,email,article_slug,first_touch_slug,last_touch_slug,landing_path,utm_source,utm_medium,utm_campaign,created_at",
  )
  .ilike("email", "%starklab_e2e%")
  .order("created_at", { ascending: false })
  .limit(5);

out.contact_error = inqErr ? inqErr.message.slice(0, 120) : null;
out.contact_count = inquiries?.length ?? 0;
out.contact_ok = (inquiries ?? []).map((r) => ({
  company_is_test: String(r.company || "").includes("E2E_TEST"),
  article_slug: r.article_slug,
  first_touch_slug: r.first_touch_slug,
  last_touch_slug: r.last_touch_slug,
  utm_source: r.utm_source,
  utm_campaign: r.utm_campaign,
  landing_has_utm: String(r.landing_path || "").includes("utm_source=e2e_test"),
}));

const { data: conversions, error: convErr } = await supabase
  .from("conversion_events")
  .select("event_type,source_url,utm_source,utm_campaign,notes,occurred_at")
  .ilike("notes", "%starklab_e2e%")
  .order("occurred_at", { ascending: false })
  .limit(5);

out.conversion_error = convErr ? convErr.message.slice(0, 120) : null;
out.conversion_count = conversions?.length ?? 0;
out.conversion_ok = (conversions ?? []).map((c) => ({
  event_type: c.event_type,
  utm_source: c.utm_source,
  has_notes_marker: String(c.notes || "").includes("starklab_e2e"),
  source_media: String(c.source_url || "").includes("/media/"),
}));

// Recent media_view for article (any session) — confirms general persistence
const { count: mvCount } = await supabase
  .from("site_events")
  .select("*", { count: "exact", head: true })
  .eq("event_name", "media_view")
  .eq("article_slug", "genba-kanri-system-comparison");

out.media_view_total_for_slug = mvCount;

writeFileSync(
  "C:/dev/starklab/scripts/.e2e-verify-report.json",
  JSON.stringify(out, null, 2),
);
console.log(JSON.stringify(out, null, 2));
