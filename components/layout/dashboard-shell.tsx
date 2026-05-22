"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChartColumnBig,
  Database,
  FilePenLine,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeaderSearch } from "@/components/layout/header-search";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserDropdown } from "@/components/layout/user-dropdown";
import {
  SidebarProvider,
  useSidebar,
} from "@/components/layout/sidebar-context";
import { AppSidebar, NavGroup } from "@/components/layout/app-sidebar";

// ── Nav builder (prefix = "" for non-locale routes, "/{locale}" for locale routes)
const SUPPORTED_LOCALES = ["en", "bn"] as const;

function getLocalePrefix(pathname: string): string {
  const first = pathname.split("/")[1];
  return (SUPPORTED_LOCALES as readonly string[]).includes(first)
    ? `/${first}`
    : "";
}

function buildAdminNav(p: string): NavGroup[] {
  return [
    {
      label: "Overview",
      items: [
        {
          title: "Dashboard",
          href: `${p}/dashboard/admin`,
          icon: LayoutDashboard,
          exact: true,
        },
        {
          title: "Analytics",
          href: `${p}/dashboard/admin/analytics`,
          icon: ChartColumnBig,
        },
      ],
    },
    {
      label: "Content",
      items: [
        {
          title: "Content Management",
          href: `${p}/dashboard/admin/cms`,
          icon: Database,
        },
        {
          title: "All Posts",
          href: `${p}/dashboard/admin/content`,
          icon: FileText,
        },
        { title: "Users", href: `${p}/dashboard/admin/users`, icon: Users },
      ],
    },
    {
      label: "System",
      items: [
        {
          title: "Admin Panel",
          href: `${p}/dashboard/admin/panel`,
          icon: ShieldCheck,
        },
        {
          title: "Settings",
          href: `${p}/dashboard/admin/settings`,
          icon: Settings,
        },
      ],
    },
  ];
}

function buildAuthorNav(p: string): NavGroup[] {
  return [
    {
      label: "My Work",
      items: [
        {
          title: "Dashboard",
          href: `${p}/dashboard/author`,
          icon: LayoutDashboard,
          exact: true,
        },
        {
          title: "My Posts",
          href: `${p}/dashboard/author/posts`,
          icon: FileText,
        },
        {
          title: "New Post",
          href: `${p}/dashboard/author/new`,
          icon: PlusSquare,
        },
      ],
    },
    {
      label: "Tools",
      items: [
        {
          title: "AI Writer",
          href: `${p}/dashboard/author/ai-write`,
          icon: Sparkles,
        },
        {
          title: "Edit Posts",
          href: `${p}/dashboard/author/edit`,
          icon: FilePenLine,
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          title: "Settings",
          href: `${p}/dashboard/author/settings`,
          icon: Settings,
        },
      ],
    },
  ];
}

// ── Logo components ───────────────────────────────────────────
function Logo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        B
      </span>
      <span className="truncate font-semibold tracking-tight text-foreground">
        BlindArchar
      </span>
    </Link>
  );
}

function CollapsedLogo() {
  return (
    <Link href="/" aria-label="Home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        B
      </span>
    </Link>
  );
}

// ── Profile components ────────────────────────────────────────
function Profile() {
  return (
    <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-2 ring-primary/20">
        <User className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          Admin User
        </p>
        <p className="truncate text-xs text-muted-foreground">
          prasanjit@gearon.ai
        </p>
      </div>
      <button
        aria-label="Log out"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function CollapsedProfile() {
  return (
    <button
      aria-label="Profile"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <User className="h-4 w-4" />
    </button>
  );
}

// ── Inner layout (consumes sidebar context) ───────────────────
type ShellLayoutProps = {
  children: React.ReactNode;
  title: string;
  groups: NavGroup[];
};

function ShellLayout({ children, title, groups }: ShellLayoutProps) {
  const { isCollapsed, setIsMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        groups={groups}
        logo={<Logo />}
        collapsedLogo={<CollapsedLogo />}
        profile={<Profile />}
        collapsedProfile={<CollapsedProfile />}
      />

      {/* Content area — shifts with sidebar width */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-[padding] duration-300 ease-in-out",
          isCollapsed ? "lg:pl-20" : "lg:pl-[260px]",
        )}
      >
        {/* Sticky header */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            {/* Left: hamburger (mobile) + page title */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
                {title}
              </h1>
            </div>

            {/* Right: search + theme + bell + user */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:block">
                <HeaderSearch />
              </div>
              <div className="lg:hidden">
                <HeaderSearch compact />
              </div>

              <LanguageSwitcher />

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
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}

// ── Public export ─────────────────────────────────────────────
type DashboardShellProps = {
  children: React.ReactNode;
  title: string;
  navGroups?: NavGroup[];
};

export function DashboardShell({
  children,
  title,
  navGroups,
}: DashboardShellProps) {
  const pathname = usePathname();
  const prefix = getLocalePrefix(pathname);
  const groups =
    navGroups ??
    (pathname.includes("/dashboard/admin")
      ? buildAdminNav(prefix)
      : buildAuthorNav(prefix));

  return (
    <SidebarProvider>
      <ShellLayout title={title} groups={groups}>
        {children}
      </ShellLayout>
    </SidebarProvider>
  );
}
