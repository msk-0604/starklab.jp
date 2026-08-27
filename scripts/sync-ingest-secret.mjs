/**
 * Sync ANALYTICS_INGEST_SECRET to Vercel Production without logging the value.
 */
import { readFileSync } from "fs";
import { spawnSync } from "child_process";
import { createHash } from "crypto";

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

function sanitize(text, secret) {
  if (!text) return "";
  return text.split(secret).join("[REDACTED]");
}

const starklabEnv = loadEnv("C:/dev/starklab/.env.local");
const engineEnv = loadEnv("C:/dev/stark-seo-engine/.env.local");
const secret = starklabEnv.ANALYTICS_INGEST_SECRET?.trim();

if (!secret) {
  console.log("result=BLOCKED_MISSING_LOCAL");
  process.exit(1);
}
if (secret !== engineEnv.ANALYTICS_INGEST_SECRET?.trim()) {
  console.log("result=BLOCKED_DIFFERENT_LOCAL");
  process.exit(1);
}

console.log(
  "fingerprint=" + createHash("sha256").update(secret).digest("hex").slice(0, 12),
);
console.log("local_compare=SAME");

function run(label, cwd, args) {
  const r = spawnSync("vercel", args, {
    cwd,
    encoding: "utf8",
    shell: true,
    input: undefined,
  });
  const out = sanitize(`${r.stdout || ""}${r.stderr || ""}`, secret);
  const lines = out
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(-8);
  console.log(`${label}_status=${r.status}`);
  for (const l of lines) console.log(`${label}_log=${l}`);
  return r.status === 0;
}

// Linked cwd → starklab-jp (no --project; CLI rejects it on this version)
const okJp = run("starklab_jp", "C:/dev/starklab", [
  "env",
  "add",
  "ANALYTICS_INGEST_SECRET",
  "production",
  "--value",
  secret,
  "--yes",
  "--force",
  "--sensitive",
  "--non-interactive",
]);

const okEngine = run("seo_engine", "C:/dev/stark-seo-engine", [
  "env",
  "add",
  "ANALYTICS_INGEST_SECRET",
  "production",
  "--value",
  secret,
  "--yes",
  "--force",
  "--sensitive",
  "--non-interactive",
]);

console.log(`overall=${okJp && okEngine ? "OK" : "PARTIAL"}`);
