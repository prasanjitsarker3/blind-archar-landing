import Image from "next/image";
import { Bookmark, Globe, Mail, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const categoryDistribution = [
  { label: "Technology", value: 3 },
  { label: "Design", value: 1 },
  { label: "Business", value: 1 },
  { label: "Science", value: 1 },
];

const latestBlogUpdates = [
  {
    title: "Understanding Quantum Computing Basics",
    date: "Updated 4/23/2026",
    status: "Draft",
  },
  {
    title: "Remote Work Culture: What Actually Works",
    date: "Submitted 4/23/2026",
    status: "Pending",
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    date: "Published 4/21/2026",
    status: "Live",
  },
];

export function AdminProfileSection() {
  return (
    <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
      <Card className="overflow-hidden">
        <div className="relative h-44 w-full">
          <Image
            src="/images/admin-cover.svg"
            alt="Admin profile cover"
            fill
            className="object-cover"
            priority
          />
        </div>
        <CardContent className="space-y-4 p-5 sm:p-6">
          <div className="-mt-14 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-4 border-[var(--card)] bg-[var(--muted)]">
                <Image
                  src="/images/admin-profile.svg"
                  alt="Admin profile image"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-[var(--font-brand)] font-semibold leading-tight">
                  Alex Morgan
                </h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Lead Administrator
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Active Profile
            </span>
          </div>

          <p className="text-sm text-[var(--muted-foreground)]">
            Oversees content quality, moderation, and publishing workflows for
            the BlindArchar blog ecosystem.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <MiniInfo
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value="admin@blindarchar.com"
            />
            <MiniInfo
              icon={<Globe className="h-4 w-4" />}
              label="Location"
              value="San Francisco"
            />
            <MiniInfo
              icon={<Users className="h-4 w-4" />}
              label="Managed Authors"
              value="2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-[var(--font-brand)]">
            Blog Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-3 gap-3">
            <BlogStat label="Blogs" value="6" />
            <BlogStat label="Published" value="4" />
            <BlogStat label="Pending" value="1" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
              Category Distribution
            </p>
            <div className="space-y-2">
              {categoryDistribution.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] px-3 py-2"
                >
                  <span className="text-sm">{item.label}</span>
                  <span className="text-sm font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
              <Bookmark className="h-4 w-4" />
              Latest Blog Updates
            </p>
            <div className="space-y-2">
              {latestBlogUpdates.map((blog) => (
                <div
                  key={blog.title}
                  className="rounded-xl border border-[var(--border)] px-3 py-2"
                >
                  <p className="text-sm font-medium leading-tight">
                    {blog.title}
                  </p>
                  <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                    {blog.date} • {blog.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function MiniInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--border)] p-3">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-sm font-medium leading-tight">{value}</p>
    </div>
  );
}

function BlogStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--muted)] px-3 py-2 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
