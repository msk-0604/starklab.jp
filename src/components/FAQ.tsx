"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <ScrollReveal className="text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            よくある質問
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            お客様からよくいただくご質問にお答えします。
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-12 space-y-3" delay={1}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-[1.25rem] border border-border bg-white shadow-[var(--shadow-card)]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-display text-[15px] font-semibold tracking-tight text-foreground sm:text-base">
                    Q. {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                      <path d="M9 4h2v5h5v2h-5v5H9v-5H4V9h5V4Z" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6 sm:text-[15px]">
                      A. {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
