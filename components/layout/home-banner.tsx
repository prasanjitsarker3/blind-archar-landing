import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type TopPublishedStory = {
  title: string;
  author: string;
  category: string;
  published: string;
  slug: string;
};

type FeaturedStory = {
  title: string;
  author: string;
  category: string;
  read: string;
  slug: string;
};

type HomeBannerProps = {
  topPublishedStories: TopPublishedStory[];
  featuredStories: FeaturedStory[];
};

type CarouselItem =
  | {
      kind: "published";
      title: string;
      author: string;
      category: string;
      meta: string;
      slug: string;
    }
  | {
      kind: "article";
      title: string;
      author: string;
      category: string;
      meta: string;
      slug: string;
    };

export function HomeBanner({
  topPublishedStories,
  featuredStories,
}: HomeBannerProps) {
  const carouselItems: CarouselItem[] = [
    ...topPublishedStories.map((story) => ({
      kind: "published" as const,
      title: story.title,
      author: story.author,
      category: story.category,
      meta: story.published,
      slug: story.slug,
    })),
    ...featuredStories.map((story) => ({
      kind: "article" as const,
      title: story.title,
      author: story.author,
      category: story.category,
      meta: story.read,
      slug: story.slug,
    })),
  ];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[linear-gradient(135deg,#eff7ea_0%,#f9f2db_50%,#efe7dd_100%)] p-7 sm:p-10 lg:p-14">
        <div
          className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,#f4d67f_0%,transparent_68%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,#c6e4ce_0%,transparent_72%)]"
          aria-hidden
        />

        <div className="relative max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--background),black_4%)] px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Daily Stories Banner
          </div>
          <h1 className="text-3xl font-[var(--font-brand)] font-semibold leading-[1] tracking-tight sm:text-4xl lg:text-5xl">
            Fresh perspectives and top writing, published every day.
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
            Read the latest banner picks, explore top publishing articles, and
            discover what readers are following right now.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              className="h-11 rounded-2xl px-6 text-sm font-medium sm:h-12 sm:text-base"
            >
              <Link href="/blog">Start Reading</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-2xl px-6 text-sm sm:h-12 sm:text-base"
            >
              <Link href="/write">Start Writing</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Flame className="h-5 w-5" />
          <h2 className="text-xl font-[var(--font-brand)] font-semibold sm:text-2xl">
            Top Published First, Then Articles
          </h2>
        </div>
        <div className="top-published-carousel overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="top-published-track flex w-max gap-4 pr-4 sm:gap-5 sm:pr-5">
            {[...carouselItems, ...carouselItems].map((item, index) => (
              <article
                key={`${item.kind}-${item.title}-${index}`}
                className="w-[16rem] flex-none rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 sm:w-[18rem]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold tracking-[0.14em] text-[var(--muted-foreground)] uppercase">
                    {item.category}
                  </p>
                  <span className="rounded-full bg-[var(--muted)] px-2 py-0.5 text-[10px] font-semibold uppercase">
                    {item.kind === "published" ? "Top" : "Article"}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-[var(--font-brand)] leading-tight">
                  <Link href={`/blog/${item.slug}`} className="hover:underline">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                  {item.author}
                </p>
                <p className="mt-1 text-sm font-medium">{item.meta}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
