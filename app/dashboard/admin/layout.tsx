import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { SidebarItem } from "@/components/layout/sidebar-nav";

const adminNavItems: SidebarItem[] = [
  { title: "Overview", href: "/dashboard/admin", icon: "layout-dashboard" },
  { title: "Analytics", href: "/dashboard/admin", icon: "chart-column-big" },
  { title: "Content", href: "/dashboard/admin/content", icon: "file-pen-line" },
  { title: "AI Panel", href: "/dashboard/admin/content", icon: "sparkles" },
  {
    title: "Moderation",
    href: "/dashboard/admin/moderation",
    icon: "shield-check",
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardShell title="Admin Dashboard" sidebarItems={adminNavItems}>
      {children}
    </DashboardShell>
  );
}
