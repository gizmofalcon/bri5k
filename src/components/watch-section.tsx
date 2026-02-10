"use client";

import { useInView } from "@/hooks/use-in-view";
import { BrutalistCard } from "./brutalist-card";

export function WatchSection() {
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
          iPhone + Apple Watch
        </h2>
        <div className="h-px flex-1 bg-[var(--tertiary)]" aria-hidden="true" />
      </div>

      <div className="mx-auto max-w-5xl space-y-6">
        {/* iPhone app card */}
        <div
          className="transition-[transform,opacity] duration-600 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <BrutalistCard weight="heavy" className="md:flex md:gap-8">
            {/* Phone mockup */}
            <div className="flex flex-shrink-0 items-center justify-center md:w-48">
              <div className="relative h-64 w-32 border-[length:var(--border-heavy)] border-[var(--primary)] bg-[var(--background)] p-3">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[7px] font-medium uppercase text-[var(--tertiary)]">
                      Bri5k
                    </p>
                    <p className="font-mono text-[7px] text-[var(--secondary)]">
                      [Active]
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase text-[var(--primary)]">
                      Run
                    </p>
                    <p className="tabular-nums font-mono text-2xl font-black text-[var(--primary)]">
                      04:32
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1 w-full bg-[var(--tertiary)]">
                    <div className="h-full w-2/5 bg-[var(--primary)]" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="tabular-nums font-mono text-[7px] text-[var(--secondary)]">
                        0.8 km
                      </span>
                      <span className="tabular-nums font-mono text-[7px] text-[var(--secondary)]">
                        42 kcal
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="tabular-nums font-mono text-[7px] text-[var(--secondary)]">
                        12:40
                      </span>
                      <span className="font-mono text-[7px] text-[var(--tertiary)]">
                        3/18
                      </span>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="flex gap-1">
                    <div className="flex-1 border-[length:var(--border-hairline)] border-[var(--tertiary)] py-1 text-center font-mono text-[6px] uppercase text-[var(--secondary)]">
                      Skip
                    </div>
                    <div className="flex-1 bg-[var(--primary)] py-1 text-center font-mono text-[6px] uppercase text-[var(--background)]">
                      Pause
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone details */}
            <div className="mt-6 flex-1 md:mt-0">
              <h3 className="text-balance font-mono text-xl font-bold text-[var(--primary)]">
                The iPhone app runs the workout.
              </h3>
              <p className="text-pretty mt-3 font-mono text-sm text-[var(--secondary)] leading-relaxed">
                Audio coaching calls out every interval transition. GPS tracks
                your route. Live Activities put your timer on the Lock Screen and
                Dynamic Island. When the workout ends, you get a full summary
                with distance, calories, pace, and a route map.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Audio", value: "Voice cues" },
                  { label: "GPS", value: "Route map" },
                  { label: "Lock Screen", value: "Live Activity" },
                  { label: "Health", value: "HealthKit sync" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
                      {item.label}
                    </p>
                    <p className="mt-1 font-mono text-xs font-bold text-[var(--primary)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BrutalistCard>
        </div>

        {/* Sync indicator */}
        <div
          className="flex items-center justify-center gap-3 py-2 transition-[transform,opacity] duration-500 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transitionDelay: "200ms",
          }}
        >
          <div className="h-px w-12 bg-[var(--tertiary)]" aria-hidden="true" />
          <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
            Bidirectional Sync
          </p>
          <div className="h-px w-12 bg-[var(--tertiary)]" aria-hidden="true" />
        </div>

        {/* Watch companion card */}
        <div
          className="transition-[transform,opacity] duration-600 ease-out"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "300ms",
          }}
        >
          <BrutalistCard weight="medium" className="md:flex md:gap-8">
            {/* Watch mockup */}
            <div className="flex flex-shrink-0 items-center justify-center md:w-48">
              <div className="relative h-44 w-36 border-[length:var(--border-medium)] border-[var(--primary)]/50 bg-[var(--background)] p-3">
                <div className="flex h-full flex-col justify-between">
                  <p className="font-mono text-[8px] font-medium uppercase text-[var(--tertiary)]">
                    Bri5k Watch
                  </p>
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase text-[var(--primary)]">
                      Run
                    </p>
                    <p className="tabular-nums font-mono text-3xl font-black text-[var(--primary)]">
                      04:32
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span className="tabular-nums font-mono text-[8px] text-[var(--secondary)]">
                      0.8 km
                    </span>
                    <span className="tabular-nums font-mono text-[8px] text-[var(--secondary)]">
                      42 kcal
                    </span>
                  </div>
                  <div className="h-1 w-full bg-[var(--tertiary)]">
                    <div className="h-full w-2/5 bg-[var(--primary)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Watch details */}
            <div className="mt-6 flex-1 md:mt-0">
              <h3 className="text-balance font-mono text-xl font-bold text-[var(--primary)]">
                The Watch mirrors it. Or leads.
              </h3>
              <p className="text-pretty mt-3 font-mono text-sm text-[var(--secondary)] leading-relaxed">
                Start a workout on your phone and the Watch shows live status
                automatically. Or start from the Watch itself and the phone
                picks it up. Either way, both devices stay in sync. Control
                everything with gestures -- no need to look at your phone
                mid-run.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: "Tap", action: "Pause / Resume" },
                  { label: "Double Tap", action: "Skip Interval" },
                  { label: "Long Press", action: "End Workout" },
                ].map((gesture) => (
                  <div
                    key={gesture.label}
                    className="border-[length:var(--border-light)] border-[var(--tertiary)] bg-[var(--background)] p-3"
                  >
                    <p className="font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
                      {gesture.label}
                    </p>
                    <p className="mt-1 font-mono text-xs font-bold text-[var(--primary)]">
                      {gesture.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BrutalistCard>
        </div>
      </div>
    </section>
  );
}
