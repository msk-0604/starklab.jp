import { readFileSync } from "fs";

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
const body = {
  event_name: "media_view",
  path: "/media/genba-kanri-system-comparison",
  article_slug: "genba-kanri-system-comparison",
  session_id: "s_starklab_e2e_e2e_mtawu4c3",
  visitor_id: "v_starklab_e2e_e2e_mtawu4c3",
  utm_source: "e2e_test",
  utm_medium: "seo_test",
  utm_campaign: "starklab_e2e",
  meta: { e2e: "starklab_e2e", event_id: "dedupe_probe_same" },
};

async function once() {
  const res = await fetch("https://www.starklab.jp/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...body,
      meta: { ...body.meta, event_id: "dedupe_probe_same" },
    }),
  });
  return { status: res.status, json: await res.json() };
}

const a = await once();
const b = await once();
console.log(JSON.stringify({ first: a, second: b }, null, 2));
