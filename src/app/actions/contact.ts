"use server";

import { contactTopics } from "@/lib/site";
import { sendContactNotification } from "@/lib/contact-mail";

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<string, string>>;
};

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

const topicLabels = Object.fromEntries(
  contactTopics.map((topic) => [topic.value, topic.label]),
) as Record<string, string>;

function ingestBase(): string {
  return (
    process.env.ANALYTICS_INGEST_URL?.replace(/\/$/, "") ||
    process.env.NEXT_PUBLIC_SEO_ENGINE_URL?.replace(/\/$/, "") ||
    "https://stark-seo-engine.vercel.app"
  );
}

async function postLead(payload: Record<string, unknown>): Promise<boolean> {
  const secret = process.env.ANALYTICS_INGEST_SECRET?.trim();
  if (!secret) {
    console.error("[contact] ANALYTICS_INGEST_SECRET not configured — lead ingest skipped");
    return false;
  }
  try {
    const res = await fetch(`${ingestBase()}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-analytics-secret": secret,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok;
  } catch {
    console.error("[contact] lead ingest failed");
    return false;
  }
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const topic = asString(formData.get("topic"));
  const company = asString(formData.get("company"));
  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const phone = asString(formData.get("phone"));
  const message = asString(formData.get("message"));
  const honeypot = asString(formData.get("website"));

  const attribution = {
    article_slug: asString(formData.get("source_article_slug")) || asString(formData.get("last_touch_slug")),
    first_touch_slug: asString(formData.get("first_touch_slug")) || null,
    last_touch_slug: asString(formData.get("last_touch_slug")) || null,
    landing_path: asString(formData.get("landing_page")) || null,
    referrer: asString(formData.get("referrer")) || null,
    utm_source: asString(formData.get("utm_source")) || null,
    utm_medium: asString(formData.get("utm_medium")) || null,
    utm_campaign: asString(formData.get("utm_campaign")) || null,
    utm_term: asString(formData.get("utm_term")) || null,
    utm_content: asString(formData.get("utm_content")) || null,
    session_id: asString(formData.get("session_id")) || null,
    visitor_id: asString(formData.get("visitor_id")) || null,
  };

  if (honeypot) {
    return { ok: true, message: "お問い合わせを受け付けました。" };
  }

  const errors: Record<string, string> = {};

  if (!topic || !topicLabels[topic]) {
    errors.topic = "相談内容を選択してください。";
  }
  if (!name) errors.name = "お名前を入力してください。";
  if (!email) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "メールアドレスの形式が正しくありません。";
  }
  if (!message) errors.message = "ご相談内容を入力してください。";
  if (message.length > 2000) {
    errors.message = "ご相談内容は2000文字以内で入力してください。";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "入力内容をご確認ください。",
      errors,
    };
  }

  const topicLabel = topicLabels[topic] ?? topic;

  const attributionLines = [
    `source_article: ${attribution.article_slug || "（なし）"}`,
    `first_touch: ${attribution.first_touch_slug || "—"}`,
    `last_touch: ${attribution.last_touch_slug || "—"}`,
    `utm: ${[attribution.utm_source, attribution.utm_medium, attribution.utm_campaign].filter(Boolean).join("/") || "—"}`,
  ];

  // 1) CRM / SEO Engine へ保存（メール失敗と分離）
  let leadSaved = false;
  leadSaved = await postLead({
    topic: topicLabel,
    company,
    name,
    email,
    phone,
    message,
    ...attribution,
  });

  // 2) 担当者メール通知（Resend）
  const mail = await sendContactNotification({
    topicLabel,
    company,
    name,
    email,
    phone,
    message,
    attributionLines,
  });

  if (!mail.ok && !leadSaved) {
    return {
      ok: false,
      message:
        "送信に失敗しました。お手数ですがメールにて直接ご連絡ください。",
    };
  }

  if (!mail.ok && mail.reason === "send_failed") {
    // 問い合わせは保存済み — ユーザーには成功扱い
    console.error("[contact] email notification failed but lead saved");
  }

  if (!mail.ok && mail.reason === "not_configured") {
    console.warn("[contact] RESEND_API_KEY not configured — email notification skipped");
  }

  return {
    ok: true,
    message: leadSaved
      ? "お問い合わせを受け付けました。担当者よりご連絡いたします。"
      : "お問い合わせを受け付けました。",
  };
}
