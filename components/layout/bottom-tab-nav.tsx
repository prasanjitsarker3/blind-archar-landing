"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Bookmark, Home, PenSquare, Search } from "lucide-react";

import { cn } from "@/lib/utils";

type TabDefinition = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
};

const tabs: TabDefinition[] = [
  { label: "Feed", href: "/", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Explore", href: "/blog", icon: BookOpen },
  { label: "Write", href: "/write", icon: PenSquare, requiresAuth: true },
  { label: "Library", href: "/library", icon: Bookmark, requiresAuth: true },
];

function getIsLoggedIn() {
  return false;
}

export function BottomTabNav() {
  const pathname = usePathname();
  const isLoggedIn = getIsLoggedIn();

  return (
    <nav className="w-full lg:max-w-xl mx-auto fixed inset-x-0 bottom-4 z-50 rounded-full border border-black/6 bg-white/98 backdrop-blur-sm">
      <div className="grid grid-cols-5  gap-1 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
        {tabs.map((tab) => {
          const resolvedHref =
            tab.requiresAuth && !isLoggedIn ? "/login" : tab.href;
          const active =
            pathname === tab.href ||
            (tab.href !== "/" && pathname.startsWith(`${tab.href}/`));
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={resolvedHref}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex  min-w-0 flex-col items-center justify-center gap-0.75 rounded-3xl px-2 py-1.5 text-[9px] font-medium tracking-[0.01em] transition-all duration-150 active:scale-95",
                active
                  ? "bg-[#f0eefe] text-[#6c5dd3]"
                  : "text-[#b0a9c0] hover:text-neutral-600",
              )}
            >
              <Icon
                className={cn(
                  "h-4.5 w-4.5 transition-transform duration-150",
                  active ? "scale-105 stroke-[#6c5dd3]" : "stroke-[#b0a9c0]",
                )}
              />

              <span
                className={cn(
                  "leading-none",
                  active ? "font-semibold" : "font-medium",
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
