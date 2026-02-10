import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bri5k | Begin Running, Intervals to 5K",
  description:
    "A brutalist Couch to 5K training app for iOS and Apple Watch. 9 weeks. No glow. No gradients. Just you and the road.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Bri5k | Begin Running, Intervals to 5K",
    description:
      "A brutalist Couch to 5K training app for iOS and Apple Watch. 9 weeks. No glow. No gradients. Just you and the road.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
