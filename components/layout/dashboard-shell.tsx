import { Bell } from "lucide-react";
import { HeaderSearch } from "@/components/layout/header-search";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { UserDropdown } from "@/components/layout/user-dropdown";
type DashboardShellProps = {
  children: React.ReactNode;
  title: string;
};

export function DashboardShell({ children, title }: DashboardShellProps) {
  return (
    <div className="min-h-dvh bg-[var(--background)]">
      <div className="flex min-h-dvh flex-col">
        <header className="border-b border-[var(--border)]">
          <PageContainer className="flex h-16 items-center justify-between">
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
              <UserDropdown />
            </div>
          </PageContainer>
        </header>

        <main className="flex-1 py-4 sm:py-6">
          <PageContainer>{children}</PageContainer>
        </main>
      </div>
    </div>
  );
}
