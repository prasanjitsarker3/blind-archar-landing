import Link from "next/link";
import { ArrowUpRight, Clock3, Sparkles, TrendingUp } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

const featuredStories = [
  {
    title: "The Future of Artificial Intelligence in Web Development",
    excerpt:
      "Exploring how AI is transforming the way we build and interact with web applications, from code generation to user experience optimization.",
    category: "Technology",
    author: "Alex Morgan",
    date: "4/20/2026",
    read: "8 min read",
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    excerpt:
      "Learn how to create clean, effective user interfaces that prioritize clarity and usability over visual complexity.",
    category: "Design",
    author: "Emma Wilson",
    date: "4/21/2026",
    read: "6 min read",
  },
];

const recentStories = [
  {
    title: "The Future of Artificial Intelligence in Web Development",
    excerpt:
      "Exploring how AI is transforming the way we build and interact with web applications, from code generation to user experience optimization.",
    author: "Alex Morgan",
    category: "Technology",
    date: "4/20/2026",
    read: "8 min read",
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    excerpt:
      "Learn how to create clean, effective user interfaces that prioritize clarity and usability over visual complexity.",
    author: "Emma Wilson",
    category: "Design",
    date: "4/21/2026",
    read: "6 min read",
  },
  {
    title: "Building Scalable SaaS Products: Lessons Learned",
    excerpt:
      "Key insights from building and scaling multiple SaaS products from zero to thousands of users.",
    author: "Alex Morgan",
    category: "Business",
    date: "4/18/2026",
    read: "10 min read",
  },
  {
    title: "The Art of Typography in Digital Media",
    excerpt:
      "How typography choices shape readability, tone, and trust in modern digital publishing experiences.",
    author: "Emma Wilson",
    category: "Design",
    date: "4/16/2026",
    read: "7 min read",
  },
];

const trendingStories = [
  {
    rank: "01",
    author: "Alex Morgan",
    title: "The Future of Artificial Intelligence in Web Development",
    views: "2,847 views",
  },
  {
    rank: "02",
    author: "Emma Wilson",
    title: "Minimalist Design Principles for Modern Interfaces",
    views: "1,923 views",
  },
  {
    rank: "03",
    author: "Alex Morgan",
    title: "Building Scalable SaaS Products: Lessons Learned",
    views: "1,456 views",
  },
];

const topics = ["Technology", "Design", "Business", "Culture", "Science"];

export default function LandingPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] py-20 sm:py-28 lg:py-32">
        <PageContainer>
          <div className="max-w-5xl space-y-8">
            <h1 className="max-w-5xl text-5xl font-[var(--font-brand)] font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.5rem]">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </h1>
            <p className="max-w-4xl text-xl leading-relaxed text-[var(--muted-foreground)] sm:text-2xl">
              A place to read, write, and deepen your understanding of what
              matters to you.
            </p>
            <Button
              asChild
              className="h-14 rounded-2xl px-9 text-xl font-medium"
            >
              <Link href="/blog">Start Reading</Link>
            </Button>
          </div>
        </PageContainer>
      </section>

      <section className="py-10 sm:py-14">
        <PageContainer className="space-y-7">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-2xl font-[var(--font-brand)] font-semibold sm:text-3xl">
              Featured Stories
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredStories.map((story) => (
              <article key={story.title} className="space-y-4">
                <div className="aspect-[16/9] rounded-2xl bg-[linear-gradient(135deg,#cfd1db,#edeef5)]" />
                <div className="flex flex-wrap items-center gap-3 text-base text-[var(--muted-foreground)]">
                  <span className="rounded-2xl bg-[var(--muted)] px-3 py-1 text-[var(--foreground)]">
                    {story.category}
                  </span>
                  <span>&bull;</span>
                  <span>{story.author}</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-[var(--font-brand)] leading-tight sm:text-4xl">
                    {story.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-[var(--muted-foreground)] sm:text-[1.75rem] sm:leading-[1.4] lg:text-xl">
                    {story.excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-5 text-lg text-[var(--muted-foreground)]">
                  <span className="flex items-center gap-2">
                    <Clock3 className="h-5 w-5" />
                    {story.read}
                  </span>
                  <span>{story.date}</span>
                </div>
              </article>
            ))}
          </div>
        </PageContainer>
      </section>

      <section className="border-t border-[var(--border)] py-10 sm:py-14">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-[1.7fr_0.95fr] lg:gap-14">
            <div className="space-y-8">
              <h2 className="text-3xl font-[var(--font-brand)] font-semibold sm:text-4xl">
                Recent Stories
              </h2>

              <div className="space-y-10">
                {recentStories.map((story) => (
                  <article
                    key={story.title}
                    className="grid gap-4 md:grid-cols-[1.45fr_160px] md:items-start lg:grid-cols-[1.45fr_180px]"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-xl">
                        <span className="font-semibold text-[var(--foreground)]">
                          {story.author}
                        </span>
                        <span className="text-[var(--muted-foreground)]">
                          &bull;
                        </span>
                        <span className="text-[var(--muted-foreground)]">
                          {story.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-[var(--font-brand)] leading-tight sm:text-[2.2rem]">
                        {story.title}
                      </h3>
                      <p className="max-w-4xl text-lg leading-relaxed text-[var(--muted-foreground)] sm:text-2xl lg:text-[1.1rem]">
                        {story.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-lg text-[var(--muted-foreground)] lg:text-xl">
                        <span>{story.date}</span>
                        <span>&bull;</span>
                        <span>{story.read}</span>
                      </div>
                    </div>
                    <div className="order-first aspect-square w-full rounded-2xl bg-[linear-gradient(135deg,#d7d9e3,#f0f1f6)] md:order-none" />
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5" />
                  <h2 className="text-3xl font-[var(--font-brand)] font-semibold">
                    Trending
                  </h2>
                </div>
                <div className="space-y-7">
                  {trendingStories.map((story) => (
                    <div
                      key={story.rank}
                      className="grid grid-cols-[2.75rem_1fr] gap-3"
                    >
                      <span className="text-5xl font-semibold tracking-tight text-[color-mix(in_oklab,var(--muted-foreground),white_55%)]">
                        {story.rank}
                      </span>
                      <div className="space-y-1.5">
                        <p className="text-xl font-semibold">{story.author}</p>
                        <p className="text-2xl font-[var(--font-brand)] leading-tight">
                          {story.title}
                        </p>
                        <p className="text-lg text-[var(--muted-foreground)]">
                          {story.views}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <h2 className="text-3xl font-[var(--font-brand)] font-semibold">
                  Explore Topics
                </h2>
                <div className="flex flex-wrap gap-3">
                  {topics.map((topic) => (
                    <Link
                      key={topic}
                      href="/blog"
                      className="rounded-full bg-[var(--muted)] px-5 py-3 text-lg text-[var(--foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--muted),black_6%)]"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-lg font-medium text-[var(--foreground)]"
                >
                  Browse all stories
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
