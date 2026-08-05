"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { contactTopics, siteConfig } from "@/lib/site";
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
              ホームページ制作、SEO・MEO、保守運用、KenSapo・DrawStock、AI活用まで。
              {siteConfig.coverage}でご相談を受け付けています。
            </p>

            <ul className="mt-8 space-y-3 text-sm text-muted">
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
                メールだけでも受付可能です
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
              className="rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
            >
              <div className="space-y-5">
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
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    お名前 <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={fieldClass}
                  />
                  {state.errors?.name ? (
                    <p className="mt-1.5 text-sm text-red-600">{state.errors.name}</p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    会社名・屋号
                    <span className="ml-2 text-xs font-normal text-muted">
                      任意
                    </span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    メールアドレス <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={fieldClass}
                  />
                  {state.errors?.email ? (
                    <p className="mt-1.5 text-sm text-red-600">{state.errors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    電話番号
                    <span className="ml-2 text-xs font-normal text-muted">
                      任意
                    </span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    ご相談内容 <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="例）現場写真の共有がチャットに散らばっている／図面の版管理をクラウド化したい など"
                    className={fieldClass}
                  />
                  {state.errors?.message ? (
                    <p className="mt-1.5 text-sm text-red-600">
                      {state.errors.message}
                    </p>
                  ) : null}
                </div>

                {/* スパム対策 honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {state.message ? (
                  <p
                    className={`text-sm ${state.ok ? "text-success" : "text-red-600"}`}
                    role="status"
                  >
                    {state.message}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full sm:w-auto sm:min-w-[200px]"
                >
                  {pending ? "送信中…" : "送信する"}
                </Button>
                <p className="text-xs text-muted">
                  送信後、担当よりご連絡します。{siteConfig.responseNote}。
                </p>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
