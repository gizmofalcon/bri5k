export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-12 inline-block font-mono text-xs uppercase tracking-[2px] text-[var(--tertiary)] transition-opacity hover:opacity-70"
        >
          &larr; Back
        </a>

        <h1 className="font-mono text-3xl font-black uppercase tracking-[2px] text-[var(--primary)]">
          Privacy Policy
        </h1>
        <p className="mt-2 font-mono text-xs text-[var(--tertiary)]">
          Last updated: February 18, 2026
        </p>

        <div className="mt-12 space-y-10 font-mono text-sm leading-relaxed text-[var(--secondary)]">
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Overview
            </h2>
            <p>
              Bri5k is a Couch to 5K training app for iOS and Apple Watch. Your
              privacy is simple: your data stays on your device. We do not
              collect, store, or transmit any personal information to external
              servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Data Stored on Your Device
            </h2>
            <p>The following data is stored locally on your iPhone and Apple Watch:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-[var(--tertiary)]">
              <li>Workout progress and completion status</li>
              <li>Workout history (date, duration, distance, calories)</li>
              <li>GPS route data from workouts</li>
              <li>App settings and preferences</li>
            </ul>
            <p className="mt-3">
              This data is never sent to any server. It exists only on your
              device and in your iCloud backup if you have that enabled through
              iOS.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Apple Health
            </h2>
            <p>
              Bri5k can save completed workouts to Apple Health, including
              workout duration, distance, and calories burned. This integration
              is optional and requires your explicit authorization. Health data
              is managed entirely by Apple&apos;s HealthKit framework and is never
              accessed by us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Location
            </h2>
            <p>
              Bri5k uses your location during active workouts to track your
              running route and calculate distance. Location data is stored
              locally on your device as part of your workout history. It is never
              transmitted to any external service.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Analytics &amp; Tracking
            </h2>
            <p>
              Bri5k does not include any analytics SDKs, crash reporting tools,
              advertising frameworks, or tracking pixels. We do not track you.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Third-Party Services
            </h2>
            <p>
              Bri5k does not integrate with any third-party services. There are
              no ads, no social logins, and no external data sharing.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Children&apos;s Privacy
            </h2>
            <p>
              Bri5k does not knowingly collect any information from children
              under 13.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Contact
            </h2>
            <p>
              If you have questions about this privacy policy, contact us at{" "}
              <a
                href="mailto:privacy@bri5k.app"
                className="text-[var(--primary)] underline transition-opacity hover:opacity-70"
              >
                privacy@bri5k.app
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-[var(--tertiary)] pt-6">
          <p className="font-mono text-xs text-[var(--tertiary)]">
            Bri5k | Begin Running, Intervals to 5K
          </p>
        </div>
      </div>
    </main>
  );
}
