import { Check, Edit3, Eye, Sparkles, Trash2, X } from "lucide-react";

import { AdminPanelTabs } from "@/components/layout/admin-panel-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const posts = [
  {
    title: "Understanding Quantum Computing Basics",
    author: "Alex Morgan",
    date: "4/23/2026",
    views: "0 views",
    tags: [
      { label: "draft", className: "bg-amber-100 text-amber-800" },
      {
        label: "Science",
        className: "bg-[var(--muted)] text-[var(--foreground)]",
      },
    ],
  },
  {
    title: "Remote Work Culture: What Actually Works",
    author: "Emma Wilson",
    date: "4/23/2026",
    views: "0 views",
    tags: [
      { label: "pending", className: "bg-blue-100 text-blue-700" },
      {
        label: "Business",
        className: "bg-[var(--muted)] text-[var(--foreground)]",
      },
      { label: "AI", className: "bg-violet-100 text-violet-700" },
    ],
    review: true,
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    author: "Emma Wilson",
    date: "4/21/2026",
    views: "1923 views",
    tags: [
      { label: "published", className: "bg-emerald-100 text-emerald-700" },
      {
        label: "Design",
        className: "bg-[var(--muted)] text-[var(--foreground)]",
      },
    ],
    showViews: true,
  },
];

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-4xl font-[var(--font-brand)] leading-tight">
          Admin Dashboard
        </h2>
        <p className="text-xl text-[var(--muted-foreground)]">
          Manage your content platform
        </p>
      </header>

      <AdminPanelTabs />

      <section className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-4xl font-[var(--font-brand)] leading-tight">
          All Posts (6)
        </h3>
        <Button className="h-11 px-6 text-lg">Create Post</Button>
      </section>

      <section className="space-y-3">
        {posts.map((post) => (
          <Card key={post.title}>
            <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={`${post.title}-${tag.label}`}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${tag.className}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                <p className="text-3xl font-[var(--font-brand)] leading-tight">
                  {post.title}
                </p>
                <p className="text-xl text-[var(--muted-foreground)]">
                  by {post.author} • {post.date} • {post.views}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end md:self-start">
                {post.review ? (
                  <>
                    <Button variant="ghost" size="icon" aria-label="Approve">
                      <Check className="h-4 w-4 text-emerald-600" />
                    </Button>
                    <Button variant="ghost" size="icon" aria-label="Reject">
                      <X className="h-4 w-4 text-rose-600" />
                    </Button>
                  </>
                ) : null}

                <Button variant="ghost" size="icon" aria-label="Edit">
                  <Edit3 className="h-4 w-4" />
                </Button>

                {post.showViews ? (
                  <Button variant="ghost" size="icon" aria-label="Preview">
                    <Eye className="h-4 w-4" />
                  </Button>
                ) : null}

                <Button variant="ghost" size="icon" aria-label="Delete">
                  <Trash2 className="h-4 w-4 text-rose-600" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border-dashed">
        <CardContent className="flex items-center gap-3 p-5 text-lg text-[var(--muted-foreground)]">
          <Sparkles className="h-5 w-5 text-violet-600" />
          AI recommendations and sorting can be plugged into this view.
        </CardContent>
      </Card>
    </div>
  );
}
