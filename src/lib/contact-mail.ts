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

/** Resend で担当者へ通知。未設定時は not_configured（問い合わせ本体は別途保存）。 */
export async function sendContactNotification(
  payload: ContactMailPayload,
): Promise<ContactMailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, reason: "not_configured" };
  }

  const toRaw =
    process.env.CONTACT_TO_EMAIL?.trim() ||
    process.env.CONTACT_NOTIFY_EMAIL?.trim() ||
    siteConfig.email;
  const to = toRaw.split(",").map((s) => s.trim()).filter(Boolean);
  const from =
    process.env.CONTACT_FROM_EMAIL?.trim() || "Stark Lab <onboarding@resend.dev>";

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
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      console.error("[contact-mail] Resend error:", detail);
      return { ok: false, reason: "send_failed", detail };
    }

    return { ok: true };
  } catch (error) {
    console.error("[contact-mail] send failed", error);
    return { ok: false, reason: "send_failed" };
  }
}
