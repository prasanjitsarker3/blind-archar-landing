import Link from "next/link";
import { ArrowUpRight, Clock3, Sparkles, TrendingUp } from "lucide-react";

import { HomeBanner } from "@/components/layout/home-banner";
import { PageContainer } from "@/components/layout/page-container";

const featuredStories = [
  {
    title: "The Future of Artificial Intelligence in Web Development",
    excerpt:
      "Exploring how AI is transforming the way we build and interact with web applications, from code generation to user experience optimization.",
    category: "Technology",
    author: "Alex Morgan",
    date: "4/20/2026",
    read: "8 min read",
    slug: "authoring-flow-nextjs",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    excerpt:
      "Learn how to create clean, effective user interfaces that prioritize clarity and usability over visual complexity.",
    category: "Design",
    author: "Emma Wilson",
    date: "4/21/2026",
    read: "6 min read",
    slug: "design-system-foundations",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  },
];

const topPublishedStories = [
  {
    title: "The Future of Artificial Intelligence in Web Development",
    author: "Alex Morgan",
    category: "Technology",
    published: "24.8K published reads",
    slug: "authoring-flow-nextjs",
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    author: "Emma Wilson",
    category: "Design",
    published: "19.6K published reads",
    slug: "design-system-foundations",
  },
  {
    title: "Building Scalable SaaS Products: Lessons Learned",
    author: "Alex Morgan",
    category: "Business",
    published: "16.2K published reads",
    slug: "dark-mode-done-right",
  },
  {
    title: "The Art of Typography in Digital Media",
    author: "Emma Wilson",
    category: "Design",
    published: "13.9K published reads",
    slug: "design-system-foundations",
  },
  {
    title: "Designing Better Search Experiences for Readers",
    author: "Noah Patel",
    category: "Product",
    published: "11.7K published reads",
    slug: "authoring-flow-nextjs",
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
    slug: "authoring-flow-nextjs",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Minimalist Design Principles for Modern Interfaces",
    excerpt:
      "Learn how to create clean, effective user interfaces that prioritize clarity and usability over visual complexity.",
    author: "Emma Wilson",
    category: "Design",
    date: "4/21/2026",
    read: "6 min read",
    slug: "design-system-foundations",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Building Scalable SaaS Products: Lessons Learned",
    excerpt:
      "Key insights from building and scaling multiple SaaS products from zero to thousands of users.",
    author: "Alex Morgan",
    category: "Business",
    date: "4/18/2026",
    read: "10 min read",
    slug: "dark-mode-done-right",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "The Art of Typography in Digital Media",
    excerpt:
      "How typography choices shape readability, tone, and trust in modern digital publishing experiences.",
    author: "Emma Wilson",
    category: "Design",
    date: "4/16/2026",
    read: "7 min read",
    slug: "design-system-foundations",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
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
const publicRoutes = [
  { label: "Feed", href: "/" },
  { label: "Search", href: "/search" },
  { label: "Feeds", href: "/feeds" },
  { label: "Explore", href: "/blog" },
  { label: "Write", href: "/write" },
  { label: "Library", href: "/library" },
  { label: "Profile", href: "/profile" },
  { label: "Login", href: "/login" },
];

export default function LandingPage() {
  return (
    <>
      <section className="border-b border-[var(--border)] py-4 sm:py-6 md:py-8 lg:py-8">
        <PageContainer>
          <HomeBanner
            topPublishedStories={topPublishedStories}
            featuredStories={featuredStories}
          />
        </PageContainer>
      </section>

      <section className="py-10 sm:py-14">
        <PageContainer className="space-y-7">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5" />
            <h2 className="text-xl font-[var(--font-brand)] font-semibold sm:text-2xl">
              Featured Stories
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {featuredStories.map((story) => (
              <article key={story.title} className="space-y-4">
                <img
                  src={story.image}
                  alt={story.title}
                  className="aspect-[16/9] w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
                  <span className="rounded-2xl bg-[var(--muted)] px-3 py-1 text-[var(--foreground)]">
                    {story.category}
                  </span>
                  <span>&bull;</span>
                  <span>{story.author}</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-[var(--font-brand)] leading-tight sm:text-2xl">
                    <Link
                      href={`/blog/${story.slug}`}
                      className="hover:underline"
                    >
                      {story.title}
                    </Link>
                  </h3>
                  <p className="text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
                    {story.excerpt}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)] sm:text-base">
                  <span className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
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
              <h2 className="text-2xl font-[var(--font-brand)] font-semibold sm:text-3xl">
                Recent Stories
              </h2>

              <div className="space-y-10">
                {recentStories.map((story) => (
                  <article
                    key={story.title}
                    className="grid gap-4 md:grid-cols-[1.45fr_160px] md:items-start lg:grid-cols-[1.45fr_180px]"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3 text-base sm:text-lg">
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
                      <h3 className="text-xl font-[var(--font-brand)] leading-tight sm:text-2xl">
                        <Link
                          href={`/blog/${story.slug}`}
                          className="hover:underline"
                        >
                          {story.title}
                        </Link>
                      </h3>
                      <p className="max-w-4xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
                        {story.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted-foreground)] sm:text-base">
                        <span>{story.date}</span>
                        <span>&bull;</span>
                        <span>{story.read}</span>
                      </div>
                    </div>
                    <img
                      src={story.image}
                      alt={story.title}
                      className="order-first aspect-square w-full rounded-2xl object-cover md:order-none"
                      loading="lazy"
                    />
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5" />
                  <h2 className="text-2xl font-[var(--font-brand)] font-semibold">
                    Trending
                  </h2>
                </div>
                <div className="space-y-7">
                  {trendingStories.map((story) => (
                    <div
                      key={story.rank}
                      className="grid grid-cols-[auto_1fr] gap-4 sm:gap-5"
                    >
                      <span className="text-3xl font-semibold tracking-tight text-[color-mix(in_oklab,var(--muted-foreground),white_55%)]">
                        {story.rank}
                      </span>
                      <div className="space-y-1.5">
                        <p className="text-base font-semibold sm:text-lg">
                          {story.author}
                        </p>
                        <p className="text-lg font-[var(--font-brand)] leading-tight sm:text-xl">
                          {story.title}
                        </p>
                        <p className="text-sm text-[var(--muted-foreground)] sm:text-base">
                          {story.views}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <h2 className="text-2xl font-[var(--font-brand)] font-semibold">
                  Explore Topics
                </h2>
                <div className="flex flex-wrap gap-3">
                  {topics.map((topic) => (
                    <Link
                      key={topic}
                      href="/blog"
                      className="rounded-full bg-[var(--muted)] px-4 py-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--muted),black_6%)]"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-base font-medium text-[var(--foreground)]"
                >
                  Browse all stories
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        </PageContainer>
      </section>

      <section className="border-t border-[var(--border)] py-10 sm:py-12">
        <PageContainer className="space-y-4">
          <h2 className="text-xl font-[var(--font-brand)] font-semibold sm:text-2xl">
            Public Routes
          </h2>
          <div className="flex flex-wrap gap-3">
            {publicRoutes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
              >
                {route.label}
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
