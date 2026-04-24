/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Flame, Rss, Sparkles, TrendingUp } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

const topicFilters = [
  "All",
  "Technology",
  "Design",
  "Business",
  "Writing",
  "Startup",
] as const;

const feedItems = [
  {
    id: "f-1",
    title: "How AI is Changing Editorial Workflows",
    excerpt:
      "A practical look at where AI saves time for writers and where human editing still matters.",
    author: "Alex Morgan",
    topic: "Technology",
    type: "Blog",
    read: "7 min read",
    date: "Apr 24",
    slug: "authoring-flow-nextjs",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "f-2",
    title: "The Small Design Tweaks That Improve Reading Time",
    excerpt:
      "Spacing, heading rhythm, and contrast patterns that make long content easier to read.",
    author: "Emma Wilson",
    topic: "Design",
    type: "Article",
    read: "6 min read",
    date: "Apr 23",
    slug: "design-system-foundations",
  },
  {
    id: "f-3",
    title: "Newsletter Growth from 0 to 10k Subscribers",
    excerpt:
      "A repeatable content loop to grow your blog audience without paid acquisition.",
    author: "Noah Patel",
    topic: "Business",
    type: "Blog",
    read: "9 min read",
    date: "Apr 22",
    slug: "dark-mode-done-right",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "f-4",
    title: "Write Better Intros for Technical Articles",
    excerpt:
      "Frameworks for opening paragraphs that keep readers engaged beyond the first screen.",
    author: "Ivy Chen",
    topic: "Writing",
    type: "Article",
    read: "5 min read",
    date: "Apr 21",
    slug: "authoring-flow-nextjs",
  },
  {
    id: "f-5",
    title: "Startup Lessons from Three Content Teams",
    excerpt:
      "What early-stage teams get wrong about publishing cadence and channel prioritization.",
    author: "Mason Lee",
    topic: "Startup",
    type: "Blog",
    read: "8 min read",
    date: "Apr 20",
    slug: "design-system-foundations",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "f-6",
    title: "Designing Better Blog Category Pages",
    excerpt:
      "Simple IA patterns for category pages that help users find content faster.",
    author: "Emma Wilson",
    topic: "Design",
    type: "Article",
    read: "6 min read",
    date: "Apr 19",
    slug: "dark-mode-done-right",
  },
];

const trendingBlogs = [
  {
    rank: "01",
    title: "AI Blogging Stack for Small Teams",
    views: "3.1k views",
  },
  {
    rank: "02",
    title: "Beginner-Friendly Writing Systems",
    views: "2.4k views",
  },
  {
    rank: "03",
    title: "Why Topic Clusters Still Win in 2026",
    views: "1.9k views",
  },
];

const suggestedReads = [
  "10 Content Hooks Readers Actually Click",
  "How to Build a Weekly Publishing Habit",
  "Design Patterns for Longform Reading",
];

export default function FeedsPage() {
  const [activeTopic, setActiveTopic] =
    useState<(typeof topicFilters)[number]>("All");

  const filteredFeedItems = useMemo(() => {
    return feedItems.filter(
      (item) => activeTopic === "All" || item.topic === activeTopic,
    );
  }, [activeTopic]);

  return (
    <PageContainer className="py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.55fr_0.9fr] lg:gap-10">
        <section className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Rss className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">
                Feeds
              </h1>
            </div>
            <p className="text-sm text-muted-foreground sm:text-base">
              Read blogs across multiple topics and keep scrolling through fresh
              picks.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              {topicFilters.map((topic) => (
                <Button
                  key={topic}
                  variant={activeTopic === topic ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setActiveTopic(topic)}
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">Reading Feed</p>
              <p className="text-xs text-muted-foreground">
                {filteredFeedItems.length} results
              </p>
            </div>

            <div className="max-h-136 space-y-3 overflow-y-auto pr-1 sm:pr-2">
              {filteredFeedItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="mb-3 aspect-video w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-foreground">
                      {item.topic}
                    </span>
                    <span>{item.type}</span>
                    <span>&bull;</span>
                    <span>{item.date}</span>
                    <span>&bull;</span>
                    <span>{item.read}</span>
                  </div>
                  <h2 className="mt-2 text-lg font-semibold leading-tight">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.excerpt}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">{item.author}</p>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Continue Reading
                    </Link>
                  </div>
                </article>
              ))}

              {filteredFeedItems.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  No posts match this filter. Try another topic or type.
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <h2 className="text-base font-semibold">Trending Blogs</h2>
            </div>
            <div className="space-y-3">
              {trendingBlogs.map((item) => (
                <div
                  key={item.rank}
                  className="grid grid-cols-[auto_1fr] gap-3"
                >
                  <span className="text-xl font-semibold text-muted-foreground">
                    {item.rank}
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-tight sm:text-base">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.views}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <h2 className="text-base font-semibold">Suggested For You</h2>
            </div>
            <div className="space-y-2">
              {suggestedReads.map((title) => (
                <Link
                  key={title}
                  href="/blog"
                  className="flex items-start gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted"
                >
                  <Flame className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{title}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
