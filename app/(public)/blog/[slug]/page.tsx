import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock3, UserRound } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BlogPost = {
  title: string;
  tag: string;
  author: string;
  published: string;
  readTime: string;
  intro: string;
  body: string[];
  takeaway: string;
};

const postMap: Record<string, BlogPost> = {
  "design-system-foundations": {
    title: "Design System Foundations for Content Platforms",
    tag: "UI/UX",
    author: "Emma Wilson",
    published: "April 24, 2026",
    readTime: "8 min read",
    intro:
      "A modern publishing product grows fast only when the interface language stays consistent across teams, routes, and roles.",
    body: [
      "A strong design system is not a component gallery; it is a language for collaboration. It defines visual rhythm, interaction behavior, and shared decisions that reduce unnecessary debate.",
      "With clear spacing, typography, and color tokens, teams can move faster without making the interface feel fragmented. Product quality improves when each feature ships with the same visual grammar.",
      "Route-based architecture in Next.js helps distribute this language across public and dashboard experiences while keeping consistency. A shared primitives layer allows focused experimentation without UI drift.",
      "When content products scale, the real value of a system is not speed alone. The bigger win is confidence: designers and developers know exactly how new screens should feel before writing any code.",
    ],
    takeaway:
      "Treat your design system as product infrastructure. It should evolve with your workflow, not sit apart from it.",
  },
  "authoring-flow-nextjs": {
    title: "Authoring Flow in Next.js App Router",
    tag: "Architecture",
    author: "Alex Morgan",
    published: "April 21, 2026",
    readTime: "7 min read",
    intro:
      "Great authoring tools reduce friction between writing, reviewing, and publishing so creators can stay focused on content quality.",
    body: [
      "The App Router allows nested layouts that map naturally to user roles. This lets teams define author, editor, and admin surfaces with isolated behavior and navigation.",
      "Authors should see content workflow tools first, while admins need moderation, analytics, and generation panels. Role-first structure prevents clutter and improves adoption.",
      "By colocating UI and route segments, each role evolves independently without breaking shared components. This is especially useful for content teams that ship process changes weekly.",
      "A reliable authoring flow is measured by completion rate, not just feature count. Fewer interruptions, faster draft-to-publish time, and clear status signals are what writers remember.",
    ],
    takeaway:
      "Build route architecture around editorial jobs-to-be-done, then layer features in the order each role needs them.",
  },
  "dark-mode-done-right": {
    title: "Dark Mode Done Right",
    tag: "Theming",
    author: "Noah Patel",
    published: "April 18, 2026",
    readTime: "6 min read",
    intro:
      "Dark mode succeeds when readability and hierarchy remain strong, not when colors are simply inverted.",
    body: [
      "Dark mode is best treated as a token swap, not a color inversion. Direct inversion usually harms contrast and weakens semantic meaning of states.",
      "Contrast, hierarchy, and interactive state cues must be tuned for both themes. Typography weight and spacing should often be adjusted alongside color.",
      "A class-based theme provider keeps behavior predictable and easy to scale in complex layouts. Consistent theme switching also improves trust for frequent users.",
      "The goal is comfort across long reading sessions. If users can scan quickly and interact confidently, the theme system is doing its job.",
    ],
    takeaway:
      "Design for legibility first. Theme preference is a UX setting, not just a visual preference toggle.",
  },
};

const relatedPosts = [
  {
    slug: "design-system-foundations",
    title: "Design System Foundations for Content Platforms",
  },
  {
    slug: "authoring-flow-nextjs",
    title: "Authoring Flow in Next.js App Router",
  },
  {
    slug: "dark-mode-done-right",
    title: "Dark Mode Done Right",
  },
];

const trendingNow = [
  "The Future of AI in Editorial Teams",
  "How to Build Better Category Pages",
  "Writing Hooks That Increase Read Time",
];

type BlogPostProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = postMap[slug];

  if (!post) {
    notFound();
  }

  return (
    <PageContainer className="py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.65fr_0.9fr] lg:gap-12">
        <article className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <Badge variant="outline" className="w-fit">
              {post.tag}
            </Badge>

            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {post.intro}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {post.published}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>

          <div className="space-y-5 rounded-3xl border border-border bg-card p-6 sm:p-8">
            {post.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-7 text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            <blockquote className="rounded-2xl border border-border bg-muted/50 px-4 py-3 text-sm leading-relaxed text-foreground sm:text-base">
              {post.takeaway}
            </blockquote>
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Related Posts</h2>
            <div className="mt-3 space-y-2">
              {relatedPosts
                .filter((item) => item.slug !== slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group flex items-start justify-between gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <span>{item.title}</span>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold">Trending Now</h2>
            <div className="mt-3 space-y-2">
              {trendingNow.map((title) => (
                <Link
                  key={title}
                  href="/feeds"
                  className="block rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>

          <Button asChild className="w-full">
            <Link href="/blog">Back to all blogs</Link>
          </Button>
        </aside>
      </div>
    </PageContainer>
  );
}
