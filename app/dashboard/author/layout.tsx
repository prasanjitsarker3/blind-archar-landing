import { DashboardShell } from "@/components/layout/dashboard-shell";

export default function AuthorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell title="Author Dashboard">{children}</DashboardShell>;
}
