"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { siteConfig } from "@/lib/site";
import { Button } from "./Button";
import { ScrollReveal } from "./ScrollReveal";

const initialState: ContactState = {
  ok: false,
  message: "",
};

const fields = [
  {
    name: "company",
    label: "会社名",
    type: "text",
    autoComplete: "organization",
    required: true,
  },
  {
    name: "name",
    label: "お名前",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "メールアドレス",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "電話番号",
    type: "tel",
    autoComplete: "tel",
    required: true,
  },
] as const;

export function Contact() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  return (
    <section id="contact" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Contact
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            お問い合わせ
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            無料相談・ご質問など、お気軽にご連絡ください。
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <ScrollReveal>
            <div className="h-full rounded-[var(--radius-card)] border border-border bg-surface p-7 sm:p-8">
              <dl className="space-y-6">
                <div>
                  <dt className="text-sm font-medium text-muted">屋号</dt>
                  <dd className="mt-1 font-display text-xl font-bold tracking-tight text-foreground">
                    {siteConfig.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted">担当</dt>
                  <dd className="mt-1 text-lg font-semibold text-foreground">
                    {siteConfig.owner}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted">
                    メールアドレス
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="break-all text-lg font-semibold text-accent hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={1}>
            <form
              action={formAction}
              className="rounded-[var(--radius-card)] border border-border bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
              noValidate
            >
              {/* honeypot */}
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

              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={
                      field.name === "company" || field.name === "name"
                        ? "sm:col-span-1"
                        : "sm:col-span-1"
                    }
                  >
                    <label
                      htmlFor={field.name}
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      {field.label}
                      <span className="ml-1 text-accent">*</span>
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      required={field.required}
                      className="w-full rounded-2xl border border-border bg-surface px-4 py-3.5 text-[15px] text-foreground outline-none transition-shadow placeholder:text-muted/70 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
                      placeholder={field.label}
                    />
                    {state.errors?.[field.name] && (
                      <p className="mt-1.5 text-sm text-red-600" role="alert">
                        {state.errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  お問い合わせ内容
                  <span className="ml-1 text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-y rounded-2xl border border-border bg-surface px-4 py-3.5 text-[15px] text-foreground outline-none transition-shadow placeholder:text-muted/70 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15"
                  placeholder="ご相談内容をご記入ください"
                />
                {state.errors?.message && (
                  <p className="mt-1.5 text-sm text-red-600" role="alert">
                    {state.errors.message}
                  </p>
                )}
              </div>

              {state.message && (
                <p
                  className={`mt-5 rounded-2xl px-4 py-3 text-sm ${
                    state.ok
                      ? "bg-emerald-50 text-emerald-800"
                      : "bg-red-50 text-red-700"
                  }`}
                  role="status"
                >
                  {state.message}
                </p>
              )}

              <div className="mt-7">
                <Button
                  type="submit"
                  disabled={pending}
                  className="w-full sm:w-auto sm:min-w-[200px]"
                >
                  {pending ? "送信中..." : "送信する"}
                </Button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
