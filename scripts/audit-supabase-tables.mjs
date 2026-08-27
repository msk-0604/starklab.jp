/**
 * Audit shared Supabase tables (names only, no secrets/data dumped).
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

const e = loadEnv("C:/dev/starklab/.env.local");
const url = e.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key =
  e.SUPABASE_SERVICE_ROLE_KEY?.trim() || e.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

if (!url || !key) {
  console.log("supabase=MISSING");
  process.exit(0);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const tables = [
  "site_events",
  "contact_inquiries",
  "articles",
  "conversion_events",
  "kpi_daily",
  "site_analytics_daily",
];

for (const t of tables) {
  const { error } = await supabase.from(t).select("*").limit(1);
  if (!error) {
    console.log(`${t}=EXISTS`);
    continue;
  }
  const msg = error.message || "";
  if (/Could not find the table|schema cache|does not exist/i.test(msg)) {
    console.log(`${t}=MISSING`);
  } else {
    console.log(`${t}=ERROR`);
  }
}
