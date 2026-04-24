"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock3,
  Eye,
  FilePenLine,
  FileText,
  PencilLine,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const posts = [
  {
    title: "The Future of Artificial Intelligence in Web Development",
    excerpt:
      "Exploring how AI is transforming the way we build and interact with web applications, from code generation to user experience optimization.",
    date: "Published 4/20/2026",
    read: "8 min",
    views: "2847",
    status: "published",
    category: "Technology",
  },
  {
    title: "Building Scalable SaaS Products: Lessons Learned",
    excerpt:
      "Key insights from building and scaling multiple SaaS products from zero to thousands of users.",
    date: "Published 4/18/2026",
    read: "10 min",
    views: "1456",
    status: "published",
    category: "Business",
  },
  {
    title: "Understanding Quantum Computing Basics",
    excerpt:
      "A beginner-friendly introduction to quantum computing concepts and their potential real-world applications.",
    date: "Draft",
    read: "12 min",
    views: "-",
    status: "draft",
    category: "Science",
  },
];

export function AuthorPostsPanel() {
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">("all");

  const allCount = posts.length;
  const publishedCount = posts.filter(p => p.status === "published").length;
  const draftsCount = posts.filter(p => p.status === "draft").length;

  const filteredPosts = posts.filter((post) => {
    if (activeTab === "all") return true;
    return post.status === activeTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-3xl font-[var(--font-brand)] font-semibold leading-tight">
            My Posts
          </h2>
          <p className="text-base text-[var(--muted-foreground)]">
            Create and manage your articles
          </p>
        </div>

        <Button
          asChild
          className="h-10 gap-2 rounded-xl px-5 text-sm font-medium"
        >
          <Link href="/dashboard/author/posts/new">
            <Plus className="h-5 w-5" />
            New Post
          </Link>
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<FileText className="h-5 w-5" />}
          title="Total Posts"
          value="3"
        />
        <MetricCard
          icon={<FilePenLine className="h-5 w-5" />}
          title="Published"
          value="2"
        />
        <MetricCard
          icon={<PencilLine className="h-5 w-5" />}
          title="Drafts"
          value="1"
        />
        <MetricCard
          icon={<Eye className="h-5 w-5" />}
          title="Total Views"
          value="4,303"
        />
      </section>

      <section className="space-y-4">
        <div className="overflow-x-auto border-b border-[var(--border)]">
          <div className="flex min-w-max items-center gap-6 px-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "border-b-2 border-[var(--foreground)] text-[var(--foreground)]"
                  : "border-b-2 border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              All ({allCount})
            </button>
            <button
              onClick={() => setActiveTab("published")}
              className={`px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "published"
                  ? "border-b-2 border-[var(--foreground)] text-[var(--foreground)]"
                  : "border-b-2 border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-1 py-3 text-sm font-medium transition-colors ${
                activeTab === "draft"
                  ? "border-b-2 border-[var(--foreground)] text-[var(--foreground)]"
                  : "border-b-2 border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              Drafts ({draftsCount})
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <Card key={post.title}>
              <CardContent className="flex flex-col gap-4 p-5 sm:p-7 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={
                        post.status === "published"
                          ? "rounded-2xl bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                          : "rounded-2xl bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800"
                      }
                    >
                      {post.status}
                    </span>
                    <span className="rounded-2xl bg-[var(--muted)] px-3 py-1 text-sm font-medium text-[var(--foreground)]">
                      {post.category}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <CardTitle className="text-lg font-[var(--font-brand)] font-semibold leading-tight">
                      {post.title}
                    </CardTitle>
                    <p className="max-w-3xl text-sm text-[var(--muted-foreground)] line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)]">
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" />
                      {post.read}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="h-4 w-4" />
                      {post.views}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 self-end md:self-start">
                  <Button variant="ghost" size="icon" aria-label="Edit post">
                    <PencilLine className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Preview post">
                    <Eye className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Delete post">
                    <Trash2 className="h-5 w-5 text-rose-600" />
                  </Button>
                </div>
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
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
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
      <CardContent />
    </Card>
  );
}
