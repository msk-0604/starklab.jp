/**
 * Attribution first/last touch contract via /api/leads (no Resend).
 */
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

const eng = loadEnv("C:/dev/stark-seo-engine/.env.local");
const secret = eng.ANALYTICS_INGEST_SECRET?.trim();
const url = eng.NEXT_PUBLIC_SUPABASE_URL || eng.SUPABASE_URL;
const role = eng.SUPABASE_SERVICE_ROLE_KEY;
const ingest = "https://stark-seo-engine.vercel.app";
const run = `attr_${Date.now().toString(36)}`;
const session_id = `s_starklab_e2e_${run}`;
const visitor_id = `v_starklab_e2e_${run}`;
const first = "genba-kanri-system-comparison";
const last = "construction-web-cost";

const res = await fetch(`${ingest}/api/leads`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-analytics-secret": secret,
  },
  body: JSON.stringify({
    topic: "E2E_TEST attribution",
    company: "E2E_TEST starklab_e2e_attr",
    name: "E2E_TEST",
    email: `e2e_test+attr_${run}@example.com`,
    message: "E2E_TEST first/last touch probe",
    article_slug: last,
    first_touch_slug: first,
    last_touch_slug: last,
    landing_path: `/media/${first}?utm_source=e2e_test`,
    referrer: "https://www.google.com/",
    utm_source: "e2e_test",
    utm_medium: "seo_test",
    utm_campaign: "starklab_e2e_attr",
    session_id,
    visitor_id,
  }),
});
const json = await res.json();

const supabase = createClient(url, role, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const { data } = await supabase
  .from("contact_inquiries")
  .select("article_slug,first_touch_slug,last_touch_slug,utm_campaign")
  .eq("email", `e2e_test+attr_${run}@example.com`)
  .maybeSingle();

console.log(
  JSON.stringify(
    {
      http: res.status,
      api_first: json.first_touch_slug,
      api_last: json.last_touch_slug,
      api_source: json.source_article_slug,
      db_first: data?.first_touch_slug ?? null,
      db_last: data?.last_touch_slug ?? null,
      db_article: data?.article_slug ?? null,
      first_last_distinct: data?.first_touch_slug !== data?.last_touch_slug,
      preserved_first: data?.first_touch_slug === first,
      updated_last: data?.last_touch_slug === last,
    },
    null,
    2,
  ),
);
