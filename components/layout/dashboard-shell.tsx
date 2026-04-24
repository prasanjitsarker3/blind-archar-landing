import { Bell, UserRound } from "lucide-react";

import { HeaderSearch } from "@/components/layout/header-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

type DashboardShellProps = {
  children: React.ReactNode;
  title: string;
};

export function DashboardShell({ children, title }: DashboardShellProps) {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="flex min-h-dvh flex-col">
        <header className="flex h-16 items-center justify-between border-b border-[var(--border)] px-4 sm:px-6">
          <h1 className="font-[var(--font-brand)] text-xl text-[var(--foreground)] sm:text-2xl">
            {title}
          </h1>
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
  );
}
