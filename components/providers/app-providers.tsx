"use client";

import * as React from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReduxProvider } from "@/components/providers/redux-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{ className: "font-[var(--font-sans)]" }}
        />
      </ThemeProvider>
    </ReduxProvider>
  );
}
