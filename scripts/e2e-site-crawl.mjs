/**
 * Crawl public pages and report HTTP status. No secrets. No form submit.
 */
const origin = process.argv[2] || "https://www.starklab.jp";

const start = [
  "/",
  "/services",
  "/works",
  "/media",
  "/areas",
  "/terms",
  "/privacy",
  "/tokushoho",
  "/robots.txt",
  "/sitemap.xml",
];

const seen = new Set();
const results = [];

function abs(href, from) {
  try {
    const u = new URL(href, from);
    if (u.origin !== new URL(origin).origin) return null;
    u.hash = "";
    return u.toString();
  } catch {
    return null;
  }
}

async function fetchPage(url) {
  const res = await fetch(url, { redirect: "follow" });
  const contentType = res.headers.get("content-type") || "";
  const html = contentType.includes("text/html") ? await res.text() : "";
  return { status: res.status, final: res.url, html };
}

const hrefRe = /(?:href|src)=["']([^"']+)["']/gi;

async function walk(url) {
  if (seen.has(url) || seen.size > 80) return;
  seen.add(url);
  try {
    const page = await fetchPage(url);
    results.push({ url, status: page.status, final: page.final });
    if (page.status >= 400 || !page.html) return;
    let m;
    while ((m = hrefRe.exec(page.html))) {
      const href = m[1];
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        continue;
      }
      const next = abs(href, page.final);
      if (next && !seen.has(next)) await walk(next);
    }
  } catch (e) {
    results.push({ url, status: "ERR", error: String(e).slice(0, 80) });
  }
}

for (const p of start) {
  await walk(new URL(p, origin).toString());
}

const bad = results.filter((r) => r.status !== 200 && r.status !== 308);
console.log(
  JSON.stringify(
    {
      origin,
      crawled: results.length,
      ok: results.filter((r) => r.status === 200).length,
      bad,
      sample: results.slice(0, 25).map((r) => `${r.status} ${r.url.replace(origin, "")}`),
    },
    null,
    2,
  ),
);
if (bad.length) process.exitCode = 1;
