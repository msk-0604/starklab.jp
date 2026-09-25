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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-[#f7f5f0]/95 p-3 md:hidden">
      <Link
        href="/#contact"
        className="flex w-full items-center justify-center bg-foreground px-6 py-3.5 text-[14px] font-medium tracking-[0.06em] text-background"
      >
        お問い合わせ
      </Link>
    </div>
  );
}
