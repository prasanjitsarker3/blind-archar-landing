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

export default function BlogListingPage() {
  return (
    <PageContainer className="py-14 sm:py-18">
      <div className="space-y-2">
        <h1 className="font-[var(--font-brand)] text-4xl sm:text-5xl">Blog</h1>
        <p className="max-w-2xl text-[var(--muted-foreground)]">
          Reading-first pages with balanced line length and typography for
          long-form articles.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
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
  );
}
