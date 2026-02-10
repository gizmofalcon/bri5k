"use client";

import { useInView } from "@/hooks/use-in-view";

export function PhilosophySection() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative px-6 py-24 md:px-12"
    >
      <div
        className="mx-auto max-w-3xl transition-[transform,opacity] duration-700 ease-out"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Decorative border */}
        <div className="border-[length:var(--border-heavy)] border-[var(--primary)] p-8 md:p-12">
          {/* Label */}
          <p className="mb-6 font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
            Design Philosophy
          </p>

          {/* Statement */}
          <blockquote className="text-balance font-mono text-2xl font-black text-[var(--primary)] md:text-4xl">
            No glow. No gradients. Just you and the road.
          </blockquote>

          <p className="text-pretty mt-6 font-mono text-sm text-[var(--secondary)] leading-relaxed">
            Bri5k is built with a brutalist design language. Monospaced type.
            High-contrast cream on dark. Heavy borders. Every pixel serves the
            workout. We stripped out everything that doesn&apos;t help you run.
          </p>

          {/* Design specs */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Background", value: "#0F0F11" },
              { label: "Primary", value: "#F5F0E1" },
              { label: "Font", value: "Mono" },
              { label: "Borders", value: "2.5px" },
            ].map((spec) => (
              <div key={spec.label}>
                <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
                  {spec.label}
                </p>
                <p className="tabular-nums mt-1 font-mono text-xs font-bold text-[var(--primary)]">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
