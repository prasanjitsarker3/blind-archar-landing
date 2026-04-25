"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Sparkles, Users } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  {
    title: "Overview",
    href: "/dashboard/admin",
    icon: LayoutDashboard,
  },
  {
    title: "All Posts",
    href: "/dashboard/admin/content",
    icon: FileText,
  },
  {
    title: "Users",
    href: "/dashboard/admin/users",
    icon: Users,
  },
  {
    title: "AI Generator",
    href: "/dashboard/admin/ai-generator",
    icon: Sparkles,
  },
];

export function AdminPanelTabs() {
  const pathname = usePathname();

  return (
    <div className="overflow-x-auto border-b border-[var(--border)]">
      <nav className="flex min-w-max items-center gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-2 border-b-2 px-3 py-3 text-base font-semibold transition-colors sm:px-5",
                active
                  ? "border-[var(--foreground)] text-[var(--foreground)]"
                  : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
