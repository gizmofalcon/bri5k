import { NoiseOverlay } from "@/components/noise-overlay";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { ProgramSection } from "@/components/program-section";
import { WatchSection } from "@/components/watch-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      {/* Shader layers */}
      <NoiseOverlay />

      {/* Content */}
      <main className="relative z-30">
        <HeroSection />

        {/* Divider */}
        <div className="mx-6 h-px bg-[var(--tertiary)] md:mx-12" aria-hidden="true" />

        <FeaturesSection />

        <div className="mx-6 h-px bg-[var(--tertiary)] md:mx-12" aria-hidden="true" />

        <ProgramSection />

        <div className="mx-6 h-px bg-[var(--tertiary)] md:mx-12" aria-hidden="true" />

        <WatchSection />

        <div className="mx-6 h-px bg-[var(--tertiary)] md:mx-12" aria-hidden="true" />

        <Footer />
      </main>
    </>
  );
}
