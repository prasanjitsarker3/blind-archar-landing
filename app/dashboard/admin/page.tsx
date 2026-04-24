import { Clock3, Eye, FileText, PenSquare } from "lucide-react";

import { AdminPanelTabs } from "@/components/layout/admin-panel-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentPosts = [
  {
    title: "Understanding Quantum Computing Basics",
    author: "Alex Morgan",
    date: "4/23/2026",
    status: "draft",
    statusClass: "bg-amber-100 text-amber-800",
  },
  {
    title: "Remote Work Culture: What Actually Works",
    author: "Emma Wilson",
    date: "4/23/2026",
    status: "pending",
    statusClass: "bg-blue-100 text-blue-700",
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    author: "Emma Wilson",
    date: "4/21/2026",
    status: "published",
    statusClass: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "The Future of Artificial Intelligence in Web Development",
    author: "Alex Morgan",
    date: "4/20/2026",
    status: "published",
    statusClass: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Building Scalable SaaS Products: Lessons Learned",
    author: "Alex Morgan",
    date: "4/18/2026",
    status: "published",
    statusClass: "bg-emerald-100 text-emerald-700",
  },
];

const statusOverview = [
  {
    title: "Published",
    value: 4,
    color: "bg-emerald-500",
    progress: 67,
  },
  {
    title: "Drafts",
    value: 1,
    color: "bg-amber-500",
    progress: 17,
  },
  {
    title: "Pending Review",
    value: 1,
    color: "bg-blue-500",
    progress: 17,
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-3xl font-[var(--font-brand)] font-semibold leading-tight">
          Admin Dashboard
        </h2>
        <p className="text-base text-[var(--muted-foreground)]">
          Manage your content platform
        </p>
      </header>

      <AdminPanelTabs />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<FileText className="h-5 w-5 text-[var(--muted-foreground)]" />}
          title="Total Posts"
          value="6"
          note="4 published"
        />
        <MetricCard
          icon={
            <PenSquare className="h-5 w-5 text-[var(--muted-foreground)]" />
          }
          title="Total Users"
          value="3"
          note="2 authors"
        />
        <MetricCard
          icon={<Eye className="h-5 w-5 text-[var(--muted-foreground)]" />}
          title="Total Views"
          value="7,118"
          note="Across all posts"
        />
        <MetricCard
          icon={<Clock3 className="h-5 w-5 text-[var(--muted-foreground)]" />}
          title="Avg Read Time"
          value="9 min"
          note="Per article"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {statusOverview.map((item) => (
          <Card key={item.title}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-4">
                <CardDescription className="text-sm font-medium">
                  {item.title}
                </CardDescription>
                <CardTitle className="text-3xl font-bold">{item.value}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-2 rounded-full bg-[var(--muted)]">
                <div
                  className={`h-2 rounded-full ${item.color}`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        <h3 className="text-2xl font-[var(--font-brand)] font-semibold leading-tight">
          Recent Posts
        </h3>

        <div className="space-y-3">
          {recentPosts.map((post) => (
            <Card key={post.title}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="space-y-1">
                  <p className="text-lg font-[var(--font-brand)] font-semibold leading-tight">
                    {post.title}
                  </p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    by {post.author} • Updated {post.date}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${post.statusClass}`}
                >
                  {post.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
  note,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  note: string;
}) {
  return (
    <Card>
      <CardHeader className="space-y-1 pb-3">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)]">
          {icon}
          {title}
        </div>
        <CardTitle className="text-3xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-[var(--muted-foreground)]">{note}</p>
      </CardContent>
    </Card>
  );
}
