"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { MoonStar, SunMedium } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunMedium className="hidden h-4 w-4 dark:block" />
      <MoonStar className="block h-4 w-4 dark:hidden" />
    </Button>
  );
}
