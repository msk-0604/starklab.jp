import { services } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

const icons = [
  // layout
  <path
    key="1"
    d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4H4V5Zm0 6h8v8H6a2 2 0 0 1-2-2v-6Zm10 0h6v6a2 2 0 0 1-2 2h-4v-8Z"
  />,
  // phone
  <path
    key="2"
    d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm0 2v12h8V5H8Zm3 13h2v1h-2v-1Z"
  />,
  // mail
  <path
    key="3"
    d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm2 0 6 5 6-5H6Zm12 1.6-5.4 4.5a1 1 0 0 1-1.2 0L6 7.6V18h12V7.6Z"
  />,
  // lock
  <path
    key="4"
    d="M8 10V8a4 4 0 1 1 8 0v2h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1Zm2 0h4V8a2 2 0 1 0-4 0v2Z"
  />,
  // search
  <path
    key="5"
    d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm6.7 11.3 2 2-1.4 1.4-2-2 1.4-1.4Z"
  />,
  // shield
  <path
    key="6"
    d="M12 3 5 6v5c0 4.2 2.9 8 7 9 4.1-1 7-4.8 7-9V6l-7-3Zm0 2.2 5 2.1v3.7c0 3.2-2.1 6.2-5 7.2-2.9-1-5-4-5-7.2V7.3l5-2.1Z"
  />,
  // edit
  <path
    key="7"
    d="M4 17.5V20h2.5L18 8.5 15.5 6 4 17.5ZM19.7 6.8a1 1 0 0 0 0-1.4l-2.1-2.1a1 1 0 0 0-1.4 0l-1.2 1.2 3.5 3.5 1.2-1.2Z"
  />,
  // bolt
  <path
    key="8"
    d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
  />,
  // server
  <path
    key="9"
    d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Zm2 0v4h12V5H6Zm0 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-4Zm2 0v4h8v-4H8Zm1-6.5h1.5V7H9V6.5Zm0 8h1.5V14.5H9v.5Z"
  />,
  // globe
  <path
    key="10"
    d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 2a7 7 0 0 0 0 14c1.7 0 3.2-2.8 3.7-6.5H8.3C8.8 7.8 10.3 5 12 5Zm0 0c1.7 0 3.2 2.8 3.7 6.5h-7.4C8.8 7.8 10.3 5 12 5Zm-7.6 7.5A7 7 0 0 0 12 19c3.4 0 6.2-2.4 6.9-5.5H4.4Z"
  />,
];

export function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-accent">
            Service
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            サービス内容
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            制作から運用まで、ホームページに必要なすべてを定額でご提供します。
          </p>
        </ScrollReveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((service, index) => (
            <ScrollReveal
              key={service.title}
              as="li"
              delay={(Math.min(index % 5, 4) || 0) as 0 | 1 | 2 | 3 | 4}
              className="h-full"
            >
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    {icons[index]}
                  </svg>
                </div>
                <h3 className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
