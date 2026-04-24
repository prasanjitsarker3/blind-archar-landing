import type { Metadata } from "next";
import { Baloo_Da_2, Hind, Inter } from "next/font/google";

import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const balooDa2 = Baloo_Da_2({
  variable: "--font-brand",
  subsets: ["latin"],
  display: "swap",
});

const hind = Hind({
  variable: "--font-hindi",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blind Archar",
  description: "Role-based publishing platform built with Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${balooDa2.variable} ${hind.variable} antialiased`}
    >
      <body className="min-h-dvh bg-[var(--background)] font-[var(--font-sans)] text-[var(--foreground)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
