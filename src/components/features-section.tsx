"use client";

import { useInView } from "@/hooks/use-in-view";
import { BrutalistCard } from "./brutalist-card";

const features = [
  {
    icon: "[09]",
    title: "9-Week Program",
    description:
      "Structured walk-run intervals that progress from 60-second jogs to continuous 30-minute runs.",
  },
  {
    icon: "[WA]",
    title: "Watch Companion",
    description:
      "Full workout control from your wrist. Gesture-driven: tap to pause, double-tap to skip, long-press to stop.",
  },
  {
    icon: "[LA]",
    title: "Live Activities",
    description:
      "Real-time workout status on your Lock Screen and Dynamic Island. Always visible, never distracting.",
  },
  {
    icon: "[AU]",
    title: "Audio Coaching",
    description:
      "Premium voice cues for interval transitions. Paired with haptic feedback so you feel the change.",
  },
  {
    icon: "[GP]",
    title: "GPS Tracking",
    description:
      "Route mapping with post-workout visualization. See where you went, how far you ran.",
  },
  {
    icon: "[DA]",
    title: "Progress Analytics",
    description:
      "Track completion, distance, calories, and workout history across your entire training journey.",
  },
];

export function FeaturesSection() {
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
          System Capabilities
        </h2>
        <div className="h-px flex-1 bg-[var(--tertiary)]" aria-hidden="true" />
      </div>

      {/* Grid */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <BrutalistCard
            key={feature.title}
            weight="medium"
            className="transition-[transform,opacity] duration-500 ease-out"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView
                ? "translateY(0)"
                : "translateY(16px)",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <p className="mb-3 font-mono text-xs font-bold text-[var(--tertiary)]">
              {feature.icon}
            </p>
            <h3 className="text-balance mb-2 font-mono text-base font-bold text-[var(--primary)]">
              {feature.title}
            </h3>
            <p className="text-pretty font-mono text-xs text-[var(--secondary)] leading-relaxed line-clamp-3">
              {feature.description}
            </p>
          </BrutalistCard>
        ))}
      </div>
    </section>
  );
}
