import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "LeetFlow — From problem statement to pattern in 30 seconds",
  description:
    "Interactive LeetCode pattern flowchart with code templates and curated practice problems.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
