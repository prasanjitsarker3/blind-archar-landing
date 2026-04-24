import { Bell, UserRound } from "lucide-react";

import { HeaderSearch } from "@/components/layout/header-search";
import { MobileSidebarDrawer } from "@/components/layout/mobile-sidebar-drawer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SidebarItem, SidebarNav } from "@/components/layout/sidebar-nav";

type DashboardShellProps = {
  children: React.ReactNode;
  title: string;
  sidebarItems: SidebarItem[];
};

export function DashboardShell({
  children,
  title,
  sidebarItems,
}: DashboardShellProps) {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="flex min-h-dvh flex-col md:flex-row">
        <SidebarNav
          title={title}
          items={sidebarItems}
          className="hidden md:block"
        />

        <div className="flex min-h-dvh flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-[var(--border)] px-4 sm:px-6">
            <div className="flex items-center gap-1 sm:gap-2">
              <MobileSidebarDrawer title={title} items={sidebarItems} />
              <h1 className="font-[var(--font-brand)] text-xl text-[var(--foreground)] sm:text-2xl">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <HeaderSearch />
              </div>
              <div className="lg:hidden">
                <HeaderSearch compact />
              </div>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="hidden sm:inline-flex"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Profile"
                className="hidden sm:inline-flex"
              >
                <UserRound className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
