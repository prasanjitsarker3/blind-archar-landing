import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { SidebarItem } from "@/components/layout/sidebar-nav";

const authorNavItems: SidebarItem[] = [
  { title: "Overview", href: "/dashboard/author", icon: "layout-dashboard" },
  { title: "My Posts", href: "/dashboard/author", icon: "file-text" },
  {
    title: "Create Post",
    href: "/dashboard/author/posts/new",
    icon: "plus-square",
  },
  { title: "Settings", href: "/dashboard/author/settings", icon: "settings" },
];

export default function AuthorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardShell title="Author Dashboard" sidebarItems={authorNavItems}>
      {children}
    </DashboardShell>
  );
}
