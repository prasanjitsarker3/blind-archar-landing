"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { locales, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALE_LABELS: Record<Locale, { label: string; native: string }> = {
  en: { label: "English", native: "EN" },
  bn: { label: "বাংলা", native: "BN" },
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: Locale) => {
    if (next === locale) return;

    // Persist selected locale in a cookie so proxy.ts / next-intl can read it
    // eslint-disable-next-line react-hooks/immutability
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

    // Replace the locale segment in the current URL
    const segments = pathname.split("/");
    segments[1] = next; // segments[0] is ""
    const newPath = segments.join("/") || `/${next}`;

    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          aria-label="Switch language"
          disabled={isPending}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={locale}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1.5"
            >
              <Globe className="h-4 w-4" />
              <span className="text-xs font-semibold tracking-wide">
                {LOCALE_LABELS[locale]?.native ?? locale.toUpperCase()}
              </span>
            </motion.span>
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchLocale(l)}
            className="flex items-center justify-between gap-4"
            aria-current={l === locale ? "true" : undefined}
          >
            <span>{LOCALE_LABELS[l].label}</span>
            {l === locale && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
