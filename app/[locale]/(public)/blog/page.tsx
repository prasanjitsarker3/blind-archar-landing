// SSG + ISR blog listing — pure server component, no auth required
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const posts = [
  {
    slug: "design-system-foundations",
    title: "Design System Foundations for Content Platforms",
    excerpt:
      "How consistent tokens and component APIs speed up frontend teams.",
    tag: "UI/UX",
  },
  {
    slug: "authoring-flow-nextjs",
    title: "Authoring Flow in Next.js App Router",
    excerpt:
      "Composable layouts for landing pages, author studio, and admin control.",
    tag: "Architecture",
  },
  {
    slug: "dark-mode-done-right",
    title: "Dark Mode Done Right",
    excerpt:
      "Practical patterns to keep contrast, hierarchy, and personality across themes.",
    tag: "Theming",
  },
];

export const revalidate = 300; // 5-minute ISR

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return { title: t("title") };
}

async function BlogPosts({ locale }: { locale: string }) {
  // In production, replace with a real fetch() call
  // fetch() responses are cached by Next.js automatically
  const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
    next: { revalidate: 300 },
  })
    .then((r) => r.json())
    .catch(() => ({ data: [] }));

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {(posts.data ?? []).map((post: { id: string; title: string }) => (
        <li key={post.id} className="rounded-xl border p-5">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <a
            href={`/${locale}/blog/${post.id}`}
            className="mt-2 inline-block text-sm text-primary"
          >
            {t("readMore")} →
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <div className="">
      <PageContainer className="py-14 sm:py-18">
        <div className="space-y-2">
          <h1 className="font-[var(--font-brand)] text-4xl sm:text-5xl">
            Blog
          </h1>
          <p className="max-w-2xl text-[var(--muted-foreground)]">
            Reading-first pages with balanced line length and typography for
            long-form articles.
          </p>
        </div>

        <div className="mt-8 grid gap-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
              <Card className="transition-transform duration-200 hover:-translate-y-0.5">
                <CardHeader>
                  <Badge variant="outline" className="w-fit">
                    {post.tag}
                  </Badge>
                  <CardTitle className="pt-2">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
