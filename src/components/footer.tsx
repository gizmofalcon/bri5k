"use client";

import { BrutalistButton } from "./brutalist-button";

export function Footer() {
  return (
    <footer className="relative px-6 py-24 md:px-12">
      {/* Final CTA */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-[10px] font-medium uppercase text-[var(--tertiary)]">
          Deploy Your 5K
        </p>

        <h2 className="text-balance font-mono text-4xl font-black text-[var(--primary)] md:text-5xl">
          Start Week 1.
        </h2>

        <p className="text-pretty mt-4 font-mono text-sm text-[var(--secondary)]">
          Free. No account required. Just download and run.
        </p>

        <div className="mt-8 flex justify-center gap-4">
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

      {/* Footer bar */}
      <div className="mx-auto mt-20 max-w-5xl border-t border-t-[var(--tertiary)] pt-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-xs text-[var(--tertiary)]">
            Bri5k | Begin Running, Intervals to 5K
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="font-mono text-xs text-[var(--tertiary)] transition-opacity duration-200 ease-out hover:opacity-70"
            >
              Privacy
            </a>
            <a
              href="https://reddit.com/r/C25K"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[var(--tertiary)] transition-opacity duration-200 ease-out hover:opacity-70"
            >
              r/C25K
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
