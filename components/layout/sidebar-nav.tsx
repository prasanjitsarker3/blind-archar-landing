"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartColumnBig,
  FilePenLine,
  FileText,
  LayoutDashboard,
  PlusSquare,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type SidebarItem = {
  title: string;
  href: string;
  icon: SidebarIconName;
};

type SidebarIconName =
  | "layout-dashboard"
  | "file-text"
  | "plus-square"
  | "settings"
  | "chart-column-big"
  | "file-pen-line"
  | "sparkles"
  | "shield-check";

const iconMap = {
  "layout-dashboard": LayoutDashboard,
  "file-text": FileText,
  "plus-square": PlusSquare,
  settings: Settings,
  "chart-column-big": ChartColumnBig,
  "file-pen-line": FilePenLine,
  sparkles: Sparkles,
  "shield-check": ShieldCheck,
} as const;

type SidebarNavListProps = {
  items: SidebarItem[];
  onNavigate?: () => void;
};

export function SidebarNavList({ items, onNavigate }: SidebarNavListProps) {
  const pathname = usePathname();

  return (
    <nav className="grid gap-1 px-2 pb-4 md:px-4">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = iconMap[item.icon];

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-[var(--primary)] text-white"
                : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

type SidebarNavProps = {
  title: string;
  items: SidebarItem[];
  className?: string;
};

export function SidebarNav({ title, items, className }: SidebarNavProps) {
  return (
    <aside
      className={cn(
        "w-full border-b border-[var(--border)] bg-[var(--card)]/70 md:w-72 md:border-b-0 md:border-r",
        className,
      )}
    >
      <div className="p-4 md:p-6">
        <p className="font-[var(--font-brand)] text-2xl text-[var(--foreground)]">
          {title}
        </p>
        <p className="text-sm text-[var(--muted-foreground)]">
          Role based workspace
        </p>
      </div>

      <SidebarNavList items={items} />
    </aside>
  );
}
