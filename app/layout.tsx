import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landing Template",
  description: "Single landing page for collecting demand-validation leads.",
  metadataBase: new URL(getSiteUrl())
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body className="text-[var(--foreground)] antialiased">
        <div className="grid-noise min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
