import { NextResponse } from "next/server";
import { z } from "zod";

const EventSchema = z.object({
  event_name: z.enum([
    "page_view",
    "media_view",
    "media_engage",
    "cta_click",
    "media_to_service",
    "contact_start",
    "contact_submit",
    "scroll_50",
    "scroll_90",
  ]),
  path: z.string().max(500).optional().nullable(),
  article_slug: z.string().max(200).optional().nullable(),
  article_id: z.string().uuid().optional().nullable(),
  session_id: z.string().max(80).optional().nullable(),
  visitor_id: z.string().max(80).optional().nullable(),
  duration_ms: z.number().int().min(0).max(3_600_000).optional(),
  referrer: z.string().max(1000).optional().nullable(),
  utm_source: z.string().max(200).optional().nullable(),
  utm_medium: z.string().max(200).optional().nullable(),
  utm_campaign: z.string().max(200).optional().nullable(),
  utm_term: z.string().max(200).optional().nullable(),
  utm_content: z.string().max(200).optional().nullable(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

/**
 * Proxies browser analytics to SEO Engine ingest (service_role stays off the client).
 * Falls back to ANALYTICS_INGEST_URL or production engine URL.
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = EventSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
  }

  const ingestBase =
    process.env.ANALYTICS_INGEST_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SEO_ENGINE_URL?.replace(/\/$/, "") ||
    "https://stark-seo-engine.vercel.app";

  const secret = process.env.ANALYTICS_INGEST_SECRET?.trim();
  if (!secret) {
    // Fail closed: do not open-proxy without shared secret
    return NextResponse.json(
      { ok: false, error: "ingest_secret_not_configured" },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(`${ingestBase}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-analytics-secret": secret,
      },
      body: JSON.stringify(parsed.data),
      signal: AbortSignal.timeout(8000),
    });
    const text = await upstream.text();
    return new NextResponse(text || JSON.stringify({ ok: upstream.ok }), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // Do not fail the site if analytics backend is down
    return NextResponse.json({ ok: false, skipped: true }, { status: 202 });
  }
}
