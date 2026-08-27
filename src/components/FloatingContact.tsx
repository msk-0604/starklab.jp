"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** スマホ下部の相談ボタン。フォーム付近では隠す */
export function FloatingContact() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="floating-cta fixed inset-x-0 bottom-0 z-40 p-4 md:hidden">
      <Link
        href="/#contact"
        className="flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-[var(--shadow-cta)] transition-transform duration-300 active:scale-[0.98]"
      >
        相談する
      </Link>
    </div>
  );
}
