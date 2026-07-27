"use server";

import { siteConfig } from "@/lib/site";

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<string, string>>;
};

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const company = asString(formData.get("company"));
  const name = asString(formData.get("name"));
  const email = asString(formData.get("email"));
  const phone = asString(formData.get("phone"));
  const message = asString(formData.get("message"));
  const honeypot = asString(formData.get("website"));

  if (honeypot) {
    return { ok: true, message: "お問い合わせを受け付けました。" };
  }

  const errors: Record<string, string> = {};

  if (!company) errors.company = "会社名を入力してください。";
  if (!name) errors.name = "お名前を入力してください。";
  if (!email) {
    errors.email = "メールアドレスを入力してください。";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "メールアドレスの形式が正しくありません。";
  }
  if (!phone) errors.phone = "電話番号を入力してください。";
  if (!message) errors.message = "お問い合わせ内容を入力してください。";
  if (message.length > 2000) {
    errors.message = "お問い合わせ内容は2000文字以内で入力してください。";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      message: "入力内容をご確認ください。",
      errors,
    };
  }

  // 本番では Resend 等のメール送信 API を接続できます。
  // RESEND_API_KEY が未設定の場合はバリデーション通過後に受付完了とします。
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev",
          to: [siteConfig.email],
          reply_to: email,
          subject: `【${siteConfig.name}】お問い合わせ：${name}様`,
          text: [
            `会社名: ${company}`,
            `お名前: ${name}`,
            `メール: ${email}`,
            `電話: ${phone}`,
            "",
            "お問い合わせ内容:",
            message,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return {
          ok: false,
          message:
            "送信に失敗しました。お手数ですがメールにて直接ご連絡ください。",
        };
      }
    } catch (error) {
      console.error("Contact submit error:", error);
      return {
        ok: false,
        message:
          "送信に失敗しました。お手数ですがメールにて直接ご連絡ください。",
      };
    }
  } else {
    console.info("[contact]", { company, name, email, phone, message });
  }

  return {
    ok: true,
    message: "お問い合わせを受け付けました。担当者よりご連絡いたします。",
  };
}
