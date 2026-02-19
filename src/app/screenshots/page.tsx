"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type SlideType = "iphone" | "watch" | "iphone-watch";

interface SlideData {
  headline: string;
  caption: string;
  type: SlideType;
  screenshot: string;
  watchScreenshot?: string;
}

const SLIDES: SlideData[] = [
  {
    headline: "9 Weeks.\nZero to 5K.",
    caption: "Structured walk-run intervals. Just press start.",
    type: "iphone",
    screenshot: "/screenshots/home.png",
  },
  {
    headline: "Audio Coaching.\nHaptic Cues.",
    caption: "Voice calls every interval. Feel the change.",
    type: "iphone",
    screenshot: "/screenshots/workout.png",
  },
  {
    headline: "Your Wrist.\nYour Coach.",
    caption: "Full workout control from Apple Watch.",
    type: "iphone-watch",
    screenshot: "/screenshots/workout.png",
    watchScreenshot: "/screenshots/watch.png",
  },
  {
    headline: "Always\nVisible.",
    caption: "Live Activities on Lock Screen and Dynamic Island.",
    type: "iphone",
    screenshot: "/screenshots/live-activity.png",
  },
  {
    headline: "Track\nEvery Run.",
    caption: "Distance. Calories. History. All on device.",
    type: "iphone",
    screenshot: "/screenshots/progress.png",
  },
  {
    headline: "See Where\nYou Went.",
    caption: "GPS route mapping for every workout.",
    type: "iphone",
    screenshot: "/screenshots/map.png",
  },
];

/* ─── iPhone frame ─── */
function IPhoneFrame({
  src,
  width,
  offsetY = 0,
}: {
  src: string;
  width: number;
  offsetY?: number;
}) {
  const bezelW = 12;
  const radius = 68;
  const screenRadius = radius - bezelW;
  const aspect = 2.165; // iPhone 15 Pro Max aspect ratio
  const height = width * aspect;
  const screenW = width - bezelW * 2;
  const screenH = height - bezelW * 2;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: radius,
        background: "#1A1A1C",
        border: "3px solid #333",
        boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
        overflow: "hidden",
        flexShrink: 0,
        transform: `translateY(${offsetY}px)`,
      }}
    >
      {/* Screen area */}
      <div
        style={{
          position: "absolute",
          top: bezelW,
          left: bezelW,
          width: screenW,
          height: screenH,
          borderRadius: screenRadius,
          overflow: "hidden",
          background: "#0F0F11",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>

      {/* Bottom bar indicator */}
      <div
        style={{
          position: "absolute",
          bottom: bezelW + 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: screenW * 0.35,
          height: 6,
          borderRadius: 3,
          background: "rgba(245, 240, 225, 0.2)",
          zIndex: 2,
        }}
      />
    </div>
  );
}

/* ─── Apple Watch frame ─── */
function WatchFrame({ src, width }: { src: string; width: number }) {
  const bezelW = 14;
  const radius = width * 0.28;
  const screenRadius = radius - bezelW;
  const aspect = 1.22; // Apple Watch aspect ratio
  const height = width * aspect;
  const screenW = width - bezelW * 2;
  const screenH = height - bezelW * 2;

  // Digital Crown
  const crownW = 14;
  const crownH = height * 0.18;
  const crownRadius = crownW / 2;

  // Side button
  const btnW = 12;
  const btnH = height * 0.08;

  return (
    <div style={{ position: "relative", width: width + crownW, height }}>
      {/* Digital Crown */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: height * 0.25,
          width: crownW,
          height: crownH,
          borderRadius: crownRadius,
          background: "#333",
          border: "2px solid #444",
          zIndex: 1,
        }}
      />

      {/* Side button */}
      <div
        style={{
          position: "absolute",
          right: 1,
          top: height * 0.25 + crownH + 16,
          width: btnW,
          height: btnH,
          borderRadius: btnW / 2,
          background: "#2A2A2A",
          border: "2px solid #444",
          zIndex: 1,
        }}
      />

      {/* Watch body */}
      <div
        style={{
          width,
          height,
          position: "relative",
          borderRadius: radius,
          background: "#1A1A1C",
          border: "3px solid #333",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
      >
        {/* Screen */}
        <div
          style={{
            position: "absolute",
            top: bezelW,
            left: bezelW,
            width: screenW,
            height: screenH,
            borderRadius: screenRadius,
            overflow: "hidden",
            background: "#0F0F11",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Corner ticks ─── */
function CornerTicks() {
  const positions = [
    { top: 60, left: 60, borderTop: "3px solid #4D4742", borderLeft: "3px solid #4D4742" },
    { top: 60, right: 60, borderTop: "3px solid #4D4742", borderRight: "3px solid #4D4742" },
    { bottom: 60, left: 60, borderBottom: "3px solid #4D4742", borderLeft: "3px solid #4D4742" },
    { bottom: 60, right: 60, borderBottom: "3px solid #4D4742", borderRight: "3px solid #4D4742" },
  ];

  return (
    <>
      {positions.map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            ...style,
          }}
        />
      ))}
    </>
  );
}

/* ─── Device area per slide type ─── */
function DeviceArea({ slide, scale = 1 }: { slide: SlideData; scale?: number }) {
  if (slide.type === "watch") {
    return (
      <div
        style={{
          height: 1800 * scale,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <WatchFrame src={slide.screenshot} width={600 * scale} />
      </div>
    );
  }

  if (slide.type === "iphone-watch") {
    return (
      <div
        style={{
          height: 2100 * scale,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* iPhone behind, same size as other slides, faded */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            opacity: 0.3,
          }}
        >
          <IPhoneFrame src={slide.screenshot} width={940 * scale} offsetY={140 * scale} />
        </div>
        {/* Watch overlaid, bottom-right, breaking outside phone */}
        <div
          style={{
            position: "absolute",
            right: -40 * scale,
            bottom: 100 * scale,
            zIndex: 2,
            filter: `drop-shadow(0 ${30 * scale}px ${80 * scale}px rgba(0,0,0,0.8))`,
          }}
        >
          <WatchFrame src={slide.watchScreenshot!} width={680 * scale} />
        </div>
      </div>
    );
  }

  // Default: iphone
  return (
    <div
      style={{
        height: 2100 * scale,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <IPhoneFrame src={slide.screenshot} width={940 * scale} offsetY={140 * scale} />
    </div>
  );
}

/* ─── Slide content (no button) ─── */
function SlideContent({
  slide,
  id,
  w = 1284,
  h = 2778,
}: {
  slide: SlideData;
  id: string;
  w?: number;
  h?: number;
}) {
  // Scale factor relative to the base iPhone size
  const s = w / 1284;

  return (
    <div
      id={id}
      style={{
        width: w,
        height: h,
        background: "#0F0F11",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: `0 ${80 * s}px 0`,
        fontFamily: "var(--font-jetbrains-mono), monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CornerTicks />

      {/* Text block pinned above device */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 120 * s,
          marginBottom: 60 * s,
        }}
      >
        {/* Label */}
        <p
          style={{
            fontSize: 28 * s,
            fontWeight: 500,
            letterSpacing: `${4 * s}px`,
            textTransform: "uppercase",
            color: "#4D4742",
            marginBottom: 32 * s,
          }}
        >
          Bri5k
        </p>

        {/* Headline */}
        <h2
          style={{
            fontSize: 108 * s,
            fontWeight: 900,
            lineHeight: 1.05,
            color: "#F5F0E1",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: `${2 * s}px`,
            whiteSpace: "pre-line",
            marginBottom: 24 * s,
          }}
        >
          {slide.headline}
        </h2>

        {/* Caption */}
        <p
          style={{
            fontSize: 34 * s,
            color: "#807A70",
            textAlign: "center",
            maxWidth: 900 * s,
            lineHeight: 1.5,
          }}
        >
          {slide.caption}
        </p>
      </div>

      {/* Device mockup */}
      <DeviceArea slide={slide} scale={s} />
    </div>
  );
}

/* ─── Watch-only slide for App Store ─── */
function WatchSlideContent({ src, id }: { src: string; id: string }) {
  return (
    <div
      id={id}
      style={{
        width: 396,
        height: 484,
        background: "#0F0F11",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </div>
  );
}

/* ─── Export handler ─── */
async function handleExport(
  elementId: string,
  w: number,
  h: number,
  filename: string
) {
  const el = document.getElementById(elementId);
  if (!el) return;

  // Temporarily remove the preview scale transform so html2canvas captures at full size
  let scaledParent = el.parentElement as HTMLElement | null;
  while (scaledParent && !scaledParent.style.transform?.includes("scale")) {
    scaledParent = scaledParent.parentElement;
  }
  const originalTransform = scaledParent?.style.transform;
  if (scaledParent) {
    scaledParent.style.transform = "none";
  }

  const html2canvas = (await import("html2canvas")).default;
  const canvas = await html2canvas(el, {
    width: w,
    height: h,
    scale: 1,
    useCORS: true,
    backgroundColor: "#0F0F11",
  });

  // Restore the preview scale
  if (scaledParent && originalTransform) {
    scaledParent.style.transform = originalTransform;
  }

  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/* ─── Shared button style ─── */
const btnClass =
  "font-mono text-xs uppercase tracking-[2px] text-[var(--secondary)] border border-[var(--tertiary)] px-4 py-2 hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors";

/* ─── Page ─── */
export default function ScreenshotsPage() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      router.replace("/");
    }
  }, [router]);

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-mono text-2xl font-black uppercase tracking-[2px] text-[var(--primary)] mb-2">
          App Store Screenshots
        </h1>
        <p className="font-mono text-xs text-[var(--tertiary)] mb-12">
          Drop your raw screenshots into{" "}
          <code className="text-[var(--secondary)]">public/screenshots/</code>{" "}
          as: home.png, workout.png, watch.png, live-activity.png, progress.png,
          map.png. Then export each slide below.
        </p>

        {/* ── iPhone 6.5" (1284 × 2778) ── */}
        <h2 className="font-mono text-lg font-bold uppercase tracking-[2px] text-[var(--primary)] mb-1">
          iPhone 6.5&quot; Display
        </h2>
        <p className="font-mono text-xs text-[var(--tertiary)] mb-8">
          1284 &times; 2778px
        </p>
        <div className="space-y-16 mb-24">
          {SLIDES.map((slide, i) => (
            <div key={i} className="overflow-x-auto pb-4">
              <p className="font-mono text-xs text-[var(--tertiary)] mb-4 uppercase tracking-[2px]">
                Slide {i + 1} of {SLIDES.length}
              </p>
              <div
                style={{
                  transform: "scale(0.25)",
                  transformOrigin: "top left",
                  width: 1284,
                  height: 2778,
                  marginBottom: `calc(-2778px * 0.75 + 40px)`,
                }}
              >
                <SlideContent slide={slide} id={`iphone-${i}`} />
              </div>
              <button
                onClick={() =>
                  handleExport(`iphone-${i}`, 1284, 2778, `bri5k-iphone-${i + 1}.png`)
                }
                className={btnClass}
              >
                Export PNG
              </button>
            </div>
          ))}
        </div>

        {/* ── iPad 13" (2048 × 2732) ── */}
        <h2 className="font-mono text-lg font-bold uppercase tracking-[2px] text-[var(--primary)] mb-1">
          iPad 13&quot; Display
        </h2>
        <p className="font-mono text-xs text-[var(--tertiary)] mb-8">
          2048 &times; 2732px
        </p>
        <div className="space-y-16 mb-24">
          {SLIDES.map((slide, i) => (
            <div key={i} className="overflow-x-auto pb-4">
              <p className="font-mono text-xs text-[var(--tertiary)] mb-4 uppercase tracking-[2px]">
                iPad Slide {i + 1} of {SLIDES.length}
              </p>
              <div
                style={{
                  transform: "scale(0.2)",
                  transformOrigin: "top left",
                  width: 2048,
                  height: 2732,
                  marginBottom: `calc(-2732px * 0.8 + 40px)`,
                }}
              >
                <SlideContent
                  slide={slide}
                  id={`ipad-${i}`}
                  w={2048}
                  h={2732}
                />
              </div>
              <button
                onClick={() =>
                  handleExport(`ipad-${i}`, 2048, 2732, `bri5k-ipad-${i + 1}.png`)
                }
                className={btnClass}
              >
                Export PNG
              </button>
            </div>
          ))}
        </div>

        {/* ── Apple Watch (396 × 484) ── */}
        <h2 className="font-mono text-lg font-bold uppercase tracking-[2px] text-[var(--primary)] mb-1">
          Apple Watch
        </h2>
        <p className="font-mono text-xs text-[var(--tertiary)] mb-8">
          396 &times; 484px
        </p>
        <div className="mb-24">
          <div
            style={{
              width: 396,
              height: 484,
              marginBottom: 16,
            }}
          >
            <WatchSlideContent
              src="/screenshots/watch.png"
              id="watch-0"
            />
          </div>
          <button
            onClick={() =>
              handleExport("watch-0", 396, 484, "bri5k-watch-1.png")
            }
            className={btnClass}
          >
            Export PNG
          </button>
        </div>
      </div>
    </main>
  );
}
