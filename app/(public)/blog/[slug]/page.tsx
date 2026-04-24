import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";

const postMap: Record<string, { title: string; tag: string; body: string[] }> =
  {
    "design-system-foundations": {
      title: "Design System Foundations for Content Platforms",
      tag: "UI/UX",
      body: [
        "A strong design system is not a component gallery; it is a language for collaboration.",
        "With clear spacing, typography, and color tokens, teams can move faster without making the interface feel fragmented.",
        "Route-based architecture in Next.js helps distribute this language across public and dashboard experiences while keeping consistency.",
      ],
    },
    "authoring-flow-nextjs": {
      title: "Authoring Flow in Next.js App Router",
      tag: "Architecture",
      body: [
        "The App Router allows nested layouts that map naturally to user roles.",
        "Authors should see content workflow tools first, while admins need moderation, analytics, and generation panels.",
        "By colocating UI and route segments, each role evolves independently without breaking shared components.",
      ],
    },
    "dark-mode-done-right": {
      title: "Dark Mode Done Right",
      tag: "Theming",
      body: [
        "Dark mode is best treated as a token swap, not a color inversion.",
        "Contrast, hierarchy, and interactive state cues must be tuned for both themes.",
        "A class-based theme provider keeps behavior predictable and easy to scale in complex layouts.",
      ],
    },
  };

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
    <PageContainer className="py-14 sm:py-20">
      <article className="mx-auto max-w-3xl space-y-6">
        <Badge variant="outline" className="w-fit">
          {post.tag}
        </Badge>
        <h1 className="font-[var(--font-brand)] text-4xl leading-tight sm:text-5xl">
          {post.title}
        </h1>

        <div className="space-y-5 text-lg leading-8 text-[var(--muted-foreground)]">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </PageContainer>
  );
}
