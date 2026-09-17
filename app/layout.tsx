import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "LeetFlow — From problem statement to pattern in 30 seconds",
    template: "%s · LeetFlow",
  },
  description:
    "Interactive LeetCode pattern flowchart with code templates and curated practice problems.",
  openGraph: {
    title: "LeetFlow",
    description:
      "From problem statement to pattern in 30 seconds. Interactive flowcharts, code templates, and curated LeetCode problems.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-amber-400 focus:px-3 focus:py-1.5 focus:text-sm focus:font-bold focus:text-zinc-950"
          >
            Skip to content
          </a>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div id="main" className="flex-1">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
