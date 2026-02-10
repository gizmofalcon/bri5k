"use client";

import { useInView } from "@/hooks/use-in-view";

const weeks = [
  { week: 1, run: "60s x8", walk: "90s x8", total: "30 min", milestone: false },
  { week: 2, run: "90s x6", walk: "2 min x6", total: "31 min", milestone: false },
  { week: 3, run: "90s-3 min x4", walk: "90s-3 min x4", total: "28 min", milestone: false },
  { week: 4, run: "3-5 min x3", walk: "90s x3", total: "31 min", milestone: false },
  { week: 5, run: "5-20 min x1-3", walk: "3-5 min x1-2", total: "35 min", milestone: true },
  { week: 6, run: "5-25 min x1-3", walk: "3 min x1-2", total: "35 min", milestone: false },
  { week: 7, run: "25 min x1", walk: "--", total: "35 min", milestone: false },
  { week: 8, run: "28 min x1", walk: "--", total: "38 min", milestone: false },
  { week: 9, run: "30 min x1", walk: "--", total: "40 min", milestone: true },
];

export function ProgramSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative px-6 py-24 md:px-12"
    >
      {/* Section label */}
      <div className="mb-12 flex items-center gap-3">
        <div className="h-3 w-3 bg-[var(--primary)]" aria-hidden="true" />
        <h2 className="text-balance font-mono text-xs font-bold uppercase text-[var(--secondary)]">
          Deployment Schedule
        </h2>
        <div className="h-px flex-1 bg-[var(--tertiary)]" aria-hidden="true" />
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-3xl">
        {/* Header row */}
        <div className="mb-4 grid grid-cols-[48px_1fr_1fr_1fr] gap-2 border-b border-b-[var(--tertiary)] pb-2 md:grid-cols-[64px_1fr_1fr_1fr]">
          <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
            Week
          </p>
          <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
            Run
          </p>
          <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
            Walk
          </p>
          <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
            Duration
          </p>
        </div>

        {/* Week rows */}
        {weeks.map((w, i) => (
          <div
            key={w.week}
            className="grid grid-cols-[48px_1fr_1fr_1fr] items-center gap-2 border-b border-b-[var(--tertiary)]/30 py-3 transition-[transform,opacity] duration-500 ease-out md:grid-cols-[64px_1fr_1fr_1fr]"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? "translateX(0)" : "translateX(-12px)",
              transitionDelay: `${i * 60}ms`,
            }}
          >
            {/* Week number */}
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 ${w.milestone ? "bg-[var(--primary)]" : "bg-[var(--tertiary)]"}`}
                aria-hidden="true"
              />
              <span className="tabular-nums font-mono text-sm font-bold text-[var(--primary)]">
                {String(w.week).padStart(2, "0")}
              </span>
            </div>

            <span className="tabular-nums font-mono text-xs text-[var(--primary)]">
              {w.run}
            </span>
            <span className="tabular-nums font-mono text-xs text-[var(--secondary)]">
              {w.walk}
            </span>
            <span className="tabular-nums font-mono text-xs text-[var(--secondary)]">
              {w.total}
            </span>
          </div>
        ))}

      </div>
    </section>
  );
}
