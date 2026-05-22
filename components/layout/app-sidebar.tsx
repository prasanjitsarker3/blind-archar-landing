"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/components/layout/sidebar-context";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  exact?: boolean;
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

// ── Single nav link ───────────────────────────────────────────
function NavLink({
  item,
  collapsed,
  onClick,
}: {
  item: NavItem;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  const link = (
    <Link
      href={item.href}
      onClick={onClick}
      aria-label={item.title}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg text-sm font-medium outline-none ring-ring transition-all duration-200 focus-visible:ring-2",
        collapsed ? "justify-center p-2.5" : "px-3 py-2.5",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon
        className={cn("shrink-0", collapsed ? "h-5 w-5" : "h-[18px] w-[18px]")}
      />
      {!collapsed && <span className="truncate">{item.title}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {item.title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return link;
}

// ── Nav group list ────────────────────────────────────────────
function NavList({
  groups,
  collapsed,
  onNavigate,
}: {
  groups: NavGroup[];
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
      {groups.map((group, i) => (
        <div key={i}>
          {group.label && !collapsed && (
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {group.label}
            </p>
          )}
          {group.label && collapsed && (
            <div className="mb-2 flex justify-center">
              <div className="h-px w-6 bg-border" />
            </div>
          )}
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                collapsed={collapsed}
                onClick={onNavigate}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

// ── Sidebar shell ─────────────────────────────────────────────
type AppSidebarProps = {
  groups: NavGroup[];
  logo: React.ReactNode;
  collapsedLogo: React.ReactNode;
  profile: React.ReactNode;
  collapsedProfile: React.ReactNode;
};

export function AppSidebar({
  groups,
  logo,
  collapsedLogo,
  profile,
  collapsedProfile,
}: AppSidebarProps) {
  const { isCollapsed, toggleCollapsed, isMobileOpen, setIsMobileOpen } =
    useSidebar();

  return (
    <TooltipProvider delayDuration={200}>
      {/* ── Desktop sidebar ──────────────────────────────── */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 hidden h-screen flex-col border-r border-border bg-card transition-[width] duration-300 ease-in-out lg:flex",
          isCollapsed ? "w-20" : "w-[260px]",
        )}
      >
        {/* Logo row */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-border px-3",
            isCollapsed ? "justify-center" : "justify-between gap-2",
          )}
        >
          {isCollapsed ? (
            <div className="flex items-center justify-center">
              {collapsedLogo}
            </div>
          ) : (
            <div className="min-w-0 flex-1 truncate">{logo}</div>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCollapsed}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isCollapsed ? "Expand" : "Collapse"}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Nav */}
        <NavList groups={groups} collapsed={isCollapsed} />

        {/* Profile footer */}
        <div
          className={cn(
            "shrink-0 border-t border-border p-3",
            isCollapsed && "flex justify-center",
          )}
        >
          {isCollapsed ? collapsedProfile : profile}
        </div>
      </aside>

      {/* ── Mobile overlay ───────────────────────────────── */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          isMobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            isMobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Slide-in panel */}
        <div
          className={cn(
            "absolute left-0 top-0 flex h-full w-[260px] flex-col border-r border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out",
            isMobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Mobile header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-4">
            {logo}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close sidebar"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <NavList
            groups={groups}
            collapsed={false}
            onNavigate={() => setIsMobileOpen(false)}
          />

          <div className="shrink-0 border-t border-border p-3">{profile}</div>
        </div>
      </div>
    </TooltipProvider>
  );
}
