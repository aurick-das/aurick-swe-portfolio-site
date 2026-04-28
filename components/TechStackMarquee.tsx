"use client";

type TechStackMarqueeProps = {
  items: string[];
};

export const DEFAULT_TECH_STACK = ["Next.js", "TypeScript", "Tailwind CSS"];

export function TechStackMarquee({ items }: TechStackMarqueeProps) {
  const safeItems = items.length > 0 ? items : DEFAULT_TECH_STACK;
  const renderItems = (suffix: string) =>
    safeItems.map((item, index) => (
      <li
        key={`${suffix}-${item}-${index}`}
        className="rounded-full border border-border bg-bg-soft px-4 py-1.5 text-sm text-text-muted"
      >
        {item}
      </li>
    ));

  return (
    <section className="card-surface overflow-hidden py-4">
      <h2 className="section-title px-6">Tech Stack</h2>
      <div className="group relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg-elevated to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg-elevated to-transparent" />
        <div className="marquee-track flex w-max animate-marquee [will-change:transform] group-hover:[animation-play-state:paused]">
          <ul className="flex shrink-0 items-center gap-3 pr-1.5">{renderItems("a")}</ul>
          <ul className="flex shrink-0 items-center gap-3 pl-1.5" aria-hidden="true">
            {renderItems("b")}
          </ul>
        </div>
      </div>
    </section>
  );
}
