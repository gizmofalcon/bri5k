"use client";

import { BrutalistButton } from "./brutalist-button";
import { RaceCircuit } from "./race-circuit";

export function HeroSection() {
  return (
    <header className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-24 overflow-hidden">
      {/* Race circuit animation behind content */}
      <RaceCircuit />

      {/* Content (above circuit) */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo mark */}
        <img
          src="/logo.svg"
          alt="Bri5k logo"
          width={160}
          height={145}
          className="mb-8 h-20 w-auto sm:h-24 md:h-28"
        />

        {/* Micro label */}
        <p className="mb-6 font-mono text-[10px] font-medium uppercase text-[var(--secondary)]">
          Couch to 5K Training System
        </p>

        {/* Wordmark */}
        <h1 className="text-balance text-center font-mono text-7xl font-black text-[var(--primary)] sm:text-8xl md:text-9xl">
          BRI5K
        </h1>

        {/* Tagline -- the acronym meaning */}
        <p className="text-pretty mt-4 text-center font-mono text-lg font-normal text-[var(--secondary)] md:text-xl">
          Begin Running, Intervals to 5K
        </p>

        {/* Subtitle */}
        <p className="text-pretty mt-6 max-w-md text-center font-mono text-sm text-[var(--secondary)]">
          A 9-week structured program that takes you from zero to running 5K.
          No fluff. Just run.
        </p>

        {/* CTA */}
        <div className="mt-10 flex gap-4">
          <BrutalistButton
            size="lg"
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Bri5k on the App Store"
          >
            Download for iOS
          </BrutalistButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
        <div className="h-8 w-px bg-[var(--tertiary)]" aria-hidden="true" />
        <p className="font-mono text-[8px] uppercase text-[var(--tertiary)]">
          Scroll
        </p>
      </div>
    </header>
  );
}
