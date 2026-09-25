"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { contactTopics, siteConfig } from "@/lib/site";
import { getAttributionSnapshot, resolveSourceArticleSlug } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

const initialState: ContactState = {
  ok: false,
  message: "",
};

const fieldClass =
  "w-full rounded-2xl border border-border bg-white px-4 py-3 text-[15px] outline-none transition focus:border-accent";

export function Contact() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );
  const startedRef = useRef(false);

  useEffect(() => {
    syncAttrHiddenFields();
  }, []);

  useEffect(() => {
    if (state.ok) {
      void trackEvent({
        event_name: "contact_submit",
        article_slug: resolveSourceArticleSlug(getAttributionSnapshot()) || null,
        skipIngest: true,
        meta: {
          intent_event: "contact_success",
          inquiry_page: `${window.location.pathname}${window.location.hash || ""}`,
        },
      });
    }
  }, [state.ok]);

  const onFocusCapture = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    void trackEvent({
      event_name: "contact_start",
      article_slug: resolveSourceArticleSlug(getAttributionSnapshot()) || null,
    });
  };

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <p className="text-sm font-semibold tracking-wide text-accent">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              お問い合わせ
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              KENBEIやStark Labについてのご相談を受け付けています。
              日本全国どこでもオンラインで対応します。
            </p>

            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                日本全国どこでも、オンラインで対応します
              </li>
              <li className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                無理な営業・しつこい連絡はありません
              </li>
              <li className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                {siteConfig.responseNote}
              </li>
              <li className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  ✓
                </span>
                お急ぎの場合は下記メールでも受付可能です
              </li>
            </ul>

            <dl className="mt-10 space-y-5">
              <div>
                <dt className="text-sm text-muted">{siteConfig.name}</dt>
                <dd className="mt-1 text-[15px] text-foreground">
                  {siteConfig.concept}
                  <br />
                  {siteConfig.coverage} ／ 拠点：{siteConfig.location}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">担当</dt>
                <dd className="mt-1 text-[15px] font-medium text-foreground">
                  {siteConfig.owner}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted">メール</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[15px] font-medium text-accent hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <form
              action={formAction}
              onFocusCapture={onFocusCapture}
              onSubmit={() => syncAttrHiddenFields()}
              className="rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
            >
              {/* Attribution — synced via syncAttrHiddenFields on mount/focus/submit */}
              <input type="hidden" name="source_article_slug" defaultValue="" id="attr_source_article_slug" />
              <input type="hidden" name="first_touch_slug" defaultValue="" id="attr_first_touch_slug" />
              <input type="hidden" name="last_touch_slug" defaultValue="" id="attr_last_touch_slug" />
              <input type="hidden" name="landing_page" defaultValue="" id="attr_landing_page" />
              <input type="hidden" name="referrer" defaultValue="" id="attr_referrer" />
              <input type="hidden" name="utm_source" defaultValue="" id="attr_utm_source" />
              <input type="hidden" name="utm_medium" defaultValue="" id="attr_utm_medium" />
              <input type="hidden" name="utm_campaign" defaultValue="" id="attr_utm_campaign" />
              <input type="hidden" name="utm_term" defaultValue="" id="attr_utm_term" />
              <input type="hidden" name="utm_content" defaultValue="" id="attr_utm_content" />
              <input type="hidden" name="session_id" defaultValue="" id="attr_session_id" />
              <input type="hidden" name="visitor_id" defaultValue="" id="attr_visitor_id" />
              <input type="hidden" name="inquiry_page" defaultValue="" id="attr_inquiry_page" />

              <div className="space-y-5" onFocus={syncAttrHiddenFields}>
                <div>
                  <label
                    htmlFor="topic"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    相談内容
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    required
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="" disabled>
                      選択してください
                    </option>
                    {contactTopics.map((topic) => (
                      <option key={topic.value} value={topic.value}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                  {state.errors?.topic ? (
                    <p className="mt-1.5 text-sm text-red-600">{state.errors.topic}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                    会社名
                  </label>
                  <input id="company" name="company" type="text" className={fieldClass} autoComplete="organization" />
                </div>

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    お名前 <span className="text-red-600">*</span>
                  </label>
                  <input id="name" name="name" type="text" required className={fieldClass} autoComplete="name" />
                  {state.errors?.name ? (
                    <p className="mt-1.5 text-sm text-red-600">{state.errors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input id="email" name="email" type="email" required className={fieldClass} autoComplete="email" />
                  {state.errors?.email ? (
                    <p className="mt-1.5 text-sm text-red-600">{state.errors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                    電話番号
                  </label>
                  <input id="phone" name="phone" type="tel" className={fieldClass} autoComplete="tel" />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    ご相談内容 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    maxLength={2000}
                    className={fieldClass}
                  />
                  {state.errors?.message ? (
                    <p className="mt-1.5 text-sm text-red-600">{state.errors.message}</p>
                  ) : null}
                </div>

                {/* honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {state.message ? (
                  <p
                    className={`text-sm ${state.ok ? "text-accent" : "text-red-600"}`}
                    role="status"
                  >
                    {state.message}
                  </p>
                ) : null}

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={pending}
                    className="btn-submit relative w-full overflow-hidden !rounded-2xl !px-8 !py-4 text-base"
                    data-track-cta="contact"
                  >
                    <span className="relative z-10 inline-flex items-center justify-center gap-2">
                      {pending ? (
                        <>
                          <span
                            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                            aria-hidden="true"
                          />
                          送信中…
                        </>
                      ) : (
                        "送信する"
                      )}
                    </span>
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted">
                    送信後、担当者よりご連絡します（{siteConfig.responseNote}）
                  </p>
                </div>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function syncAttrHiddenFields() {
  try {
    const a = getAttributionSnapshot();
    const map: Record<string, string> = {
      attr_source_article_slug: resolveSourceArticleSlug(a) ?? "",
      attr_first_touch_slug: a.first_touch_slug ?? "",
      attr_last_touch_slug: a.last_touch_slug ?? "",
      attr_landing_page: a.landing_page ?? window.location.pathname,
      attr_referrer: a.referrer ?? document.referrer ?? "",
      attr_utm_source: a.utm_source ?? "",
      attr_utm_medium: a.utm_medium ?? "",
      attr_utm_campaign: a.utm_campaign ?? "",
      attr_utm_term: a.utm_term ?? "",
      attr_utm_content: a.utm_content ?? "",
      attr_session_id: a.session_id,
      attr_visitor_id: a.visitor_id,
      attr_inquiry_page: `${window.location.pathname}${window.location.hash || ""}`,
    };
    for (const [id, val] of Object.entries(map)) {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el) el.value = val;
    }
  } catch {
    // ignore
  }
}
