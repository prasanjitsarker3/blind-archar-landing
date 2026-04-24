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
    <nav className=" w-full  lg:max-w-xl mx-auto fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[color-mix(in_oklab,var(--background),white_92%)]/98 ">
      <div className="grid grid-cols-5 gap-2 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-3">
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
                "flex min-w-0 scale-100 flex-col items-center justify-center gap-1 rounded-[1.65rem] px-2 py-3 text-[11px] font-semibold uppercase tracking-[0.04em] transition-all duration-150 active:scale-95",
                active
                  ? "bg-[color-mix(in_oklab,var(--primary),white_92%)] text-[var(--primary)] shadow-[0_1px_0_rgba(79,70,229,0.08)]"
                  : "text-[#94a3b8] hover:text-[var(--foreground)]",
              )}
            >
              <Icon
                className={cn(
                  "h-7 w-7 transition-transform duration-150",
                  active && "scale-105",
                )}
              />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
