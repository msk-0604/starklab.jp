import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

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

function st(v) {
  if (v == null) return "MISSING";
  if (!String(v).trim()) return "EMPTY";
  return "CONFIGURED";
}

const lab = loadEnv("C:/dev/starklab/.env.local");
const eng = loadEnv("C:/dev/stark-seo-engine/.env.local");

const labUrl = lab.NEXT_PUBLIC_SUPABASE_URL;
const engUrl = eng.NEXT_PUBLIC_SUPABASE_URL || eng.SUPABASE_URL;
const engRole = eng.SUPABASE_SERVICE_ROLE_KEY;

console.log(
  JSON.stringify(
    {
      lab_url: st(labUrl),
      eng_url: st(engUrl),
      url_same: labUrl && engUrl ? (labUrl === engUrl ? "SAME" : "DIFFERENT") : "N/A",
      eng_service_role: st(engRole),
      eng_secret: st(eng.ANALYTICS_INGEST_SECRET),
      secret_same:
        lab.ANALYTICS_INGEST_SECRET && eng.ANALYTICS_INGEST_SECRET
          ? lab.ANALYTICS_INGEST_SECRET === eng.ANALYTICS_INGEST_SECRET
            ? "SAME"
            : "DIFFERENT"
          : "N/A",
    },
    null,
    2,
  ),
);

if (!engUrl || !engRole) {
  console.log(JSON.stringify({ db: "BLOCKED" }));
  process.exit(0);
}

const supabase = createClient(engUrl, engRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data: rows, error } = await supabase
  .from("site_events")
  .select(
    "event_name,path,article_slug,session_id,utm_source,utm_medium,utm_campaign,meta,occurred_at",
  )
  .like("session_id", "s_starklab_e2e_%")
  .order("occurred_at", { ascending: false })
  .limit(40);

const { data: inquiries, error: inqErr } = await supabase
  .from("contact_inquiries")
  .select(
    "company,email,article_slug,first_touch_slug,last_touch_slug,landing_path,utm_source,utm_medium,utm_campaign,created_at",
  )
  .or("email.ilike.%starklab_e2e%,company.ilike.%E2E_TEST%")
  .order("created_at", { ascending: false })
  .limit(5);

const { data: conversions, error: convErr } = await supabase
  .from("conversion_events")
  .select("event_type,source_url,utm_source,utm_campaign,notes,occurred_at")
  .ilike("notes", "%starklab_e2e%")
  .order("occurred_at", { ascending: false })
  .limit(5);

const { count: mvCount } = await supabase
  .from("site_events")
  .select("*", { count: "exact", head: true })
  .eq("event_name", "media_view")
  .eq("article_slug", "genba-kanri-system-comparison");

const { count: submitCount } = await supabase
  .from("site_events")
  .select("*", { count: "exact", head: true })
  .eq("event_name", "contact_submit")
  .eq("article_slug", "genba-kanri-system-comparison");

console.log(
  JSON.stringify(
    {
      site_events_error: error ? "ERROR" : null,
      site_events_count: rows?.length ?? 0,
      site_events_names: [...new Set((rows ?? []).map((r) => r.event_name))],
      site_events_summary: (rows ?? []).map((r) => ({
        event_name: r.event_name,
        article_slug: r.article_slug,
        path_ok: Boolean(r.path?.includes("/media/")),
        utm_source: r.utm_source,
        utm_campaign: r.utm_campaign,
        meta_scroll: r.meta?.scroll ?? null,
        meta_visitor: Boolean(r.meta?.visitor_id),
        meta_e2e: r.meta?.e2e ?? null,
        session_prefix_ok: Boolean(r.session_id?.startsWith("s_starklab_e2e_")),
        occurred_at: r.occurred_at,
      })),
      contact_error: inqErr ? "ERROR" : null,
      contact_count: inquiries?.length ?? 0,
      contact_ok: (inquiries ?? []).map((r) => ({
        company_is_test: String(r.company || "").includes("E2E_TEST"),
        article_slug: r.article_slug,
        first_touch_slug: r.first_touch_slug,
        last_touch_slug: r.last_touch_slug,
        utm_source: r.utm_source,
        utm_campaign: r.utm_campaign,
        landing_has_utm: String(r.landing_path || "").includes("utm_source=e2e_test"),
      })),
      conversion_error: convErr ? "ERROR" : null,
      conversion_count: conversions?.length ?? 0,
      conversion_ok: (conversions ?? []).map((c) => ({
        event_type: c.event_type,
        utm_source: c.utm_source,
        has_notes_marker: String(c.notes || "").includes("starklab_e2e"),
        source_media: String(c.source_url || "").includes("/media/"),
      })),
      media_view_total_for_slug: mvCount,
      contact_submit_total_for_slug: submitCount,
    },
    null,
    2,
  ),
);
