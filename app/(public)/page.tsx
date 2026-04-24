import Link from "next/link";
import { ArrowRight, Sparkles, WandSparkles } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const highlights = [
  {
    title: "Hindi-first Publishing",
    description:
      "Readable long-form pages designed for Hindi and mixed-script writing.",
  },
  {
    title: "Author Studio",
    description:
      "Draft, edit, and ship posts with role-based workflows and clean tooling.",
  },
  {
    title: "AI-assisted Editorial",
    description:
      "Generate outlines, summaries, and SEO snippets in one admin workspace.",
  },
];

export default function LandingPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <PageContainer>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <Badge
                variant="secondary"
                className="gap-2 rounded-full px-3 py-1"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Modern publishing stack
              </Badge>
              <h1 className="font-[var(--font-brand)] text-5xl leading-tight sm:text-6xl md:text-7xl">
                लिखिए, प्रकाशित कीजिए, बढ़ाइए अपना लेखन ब्रांड
              </h1>
              <p className="max-w-2xl text-lg text-[var(--muted-foreground)]">
                Blind Archar is a modern content platform with clear role-based
                dashboards for public readers, authors, and admins. Built on a
                scalable design system with dark mode and reusable components.
              </p>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/dashboard/author/posts/new">
                    Create Your First Post
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/blog">Read Blog</Link>
                </Button>
              </div>
            </div>

            <Card className="border-transparent bg-[linear-gradient(145deg,_rgba(79,70,229,0.14),rgba(16,185,129,0.10))]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WandSparkles className="h-5 w-5 text-[var(--primary)]" />
                  Built for scale
                </CardTitle>
                <CardDescription>
                  Scalable layout architecture using route groups + nested
                  dashboards.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-[var(--muted-foreground)]">
                <p>1. Public experience with reading-first typography.</p>
                <p>2. Author dashboard with post lifecycle controls.</p>
                <p>3. Admin console with analytics and AI tools.</p>
              </CardContent>
            </Card>
          </div>
        </PageContainer>
      </section>

      <section className="pb-10">
        <PageContainer>
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
