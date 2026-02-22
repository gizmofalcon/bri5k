import Link from "next/link";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-24 md:px-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-12 inline-block font-mono text-xs uppercase tracking-[2px] text-[var(--tertiary)] transition-opacity hover:opacity-70"
        >
          &larr; Back
        </Link>

        <h1 className="font-mono text-3xl font-black uppercase tracking-[2px] text-[var(--primary)]">
          Support
        </h1>
        <p className="mt-2 font-mono text-xs text-[var(--tertiary)]">
          Help &amp; Contact
        </p>

        <div className="mt-12 space-y-10 font-mono text-sm leading-relaxed text-[var(--secondary)]">
          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Get in Touch
            </h2>
            <p>
              If you have questions, feedback, or need help with Bri5k, send us
              an email at{" "}
              <a
                href="mailto:support@bri5k.app"
                className="text-[var(--primary)] underline transition-opacity hover:opacity-70"
              >
                support@bri5k.app
              </a>
            </p>
            <p className="mt-3">
              We typically respond within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              Common Questions
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-[var(--primary)]">
                  How do I connect Bri5k to Apple Health?
                </p>
                <p className="mt-1 text-[var(--tertiary)]">
                  When you first complete a workout, Bri5k will ask for
                  permission to save data to Apple Health. You can also manage
                  this in iOS Settings &gt; Health &gt; Data Access &amp;
                  Devices.
                </p>
              </div>
              <div>
                <p className="text-[var(--primary)]">
                  Can I restart a week?
                </p>
                <p className="mt-1 text-[var(--tertiary)]">
                  Yes. You can repeat any week or individual workout as many
                  times as you need.
                </p>
              </div>
              <div>
                <p className="text-[var(--primary)]">
                  Does Bri5k work without Apple Watch?
                </p>
                <p className="mt-1 text-[var(--tertiary)]">
                  Yes. Bri5k works on iPhone with or without an Apple Watch. The
                  Watch app is an optional companion for wrist-based controls and
                  heart rate tracking.
                </p>
              </div>
              <div>
                <p className="text-[var(--primary)]">
                  Why isn&apos;t GPS tracking my route?
                </p>
                <p className="mt-1 text-[var(--tertiary)]">
                  Make sure Location is set to &ldquo;While Using the
                  App&rdquo; in iOS Settings &gt; Bri5k &gt; Location. GPS
                  requires an open sky for best accuracy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xs font-bold uppercase tracking-[2px] text-[var(--primary)]">
              App Information
            </h2>
            <ul className="space-y-1 text-[var(--tertiary)]">
              <li>Platform: iOS &amp; watchOS</li>
              <li>Price: Free</li>
              <li>Account required: No</li>
            </ul>
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
