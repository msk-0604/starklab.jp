import { siteConfig } from "@/lib/site";

export type ContactMailPayload = {
  topicLabel: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  attributionLines: string[];
};

export type ContactMailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed"; detail?: string };

const DEFAULT_FROM = "Stark Lab <contact@starklab.jp>";

/**
 * Resend で担当者へ通知（server-only）。
 * To = CONTACT_NOTIFICATION_EMAIL（または互換の CONTACT_TO_EMAIL）
 * From = CONTACT_FROM_EMAIL（既定: Stark Lab <contact@starklab.jp>）
 * Reply-To = 問い合わせ者メール
 */
export async function sendContactNotification(
  payload: ContactMailPayload,
): Promise<ContactMailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: "not_configured" };
  }

  const toRaw =
    process.env.CONTACT_NOTIFICATION_EMAIL?.trim() ||
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.CONTACT_NOTIFY_EMAIL?.trim() ||
    "";
  const to = toRaw.split(",").map((s) => s.trim()).filter(Boolean);
  if (to.length === 0) {
    console.error("[contact-mail] CONTACT_NOTIFICATION_EMAIL not configured");
    return { ok: false, reason: "not_configured" };
  }

  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: payload.email,
        subject: `【${siteConfig.name}】${payload.topicLabel}：${payload.name}様`,
        text: [
          `相談内容: ${payload.topicLabel}`,
          `会社名: ${payload.company || "（未記入）"}`,
          `お名前: ${payload.name}`,
          `メール: ${payload.email}`,
          `電話: ${payload.phone || "（未記入）"}`,
          ...payload.attributionLines,
          "",
          "お問い合わせ内容:",
          payload.message,
          "",
          "※ このメールに返信すると、お問い合わせ者へ届きます（Reply-To）。",
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!res.ok) {
      // Do not log API keys or full recipient PII dumps
      const detail = (await res.text()).slice(0, 200);
      console.error("[contact-mail] Resend error status=", res.status, detail);
      return { ok: false, reason: "send_failed", detail };
    }

    return { ok: true };
  } catch {
    console.error("[contact-mail] send failed");
    return { ok: false, reason: "send_failed" };
  }
}
