import Link from "next/link";
import { PenBox } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 sm:py-12">
      <PageContainer className="space-y-8">
        <div className="grid gap-8 md:grid-cols-[1.25fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#09071d] text-white">
                <PenBox className="h-4 w-4" />
              </div>
              <p className="text-xl font-semibold text-foreground">
                ContentHub
              </p>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              A modern content publishing platform for writers and readers.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-foreground">Platform</p>
            <div className="grid gap-2 text-sm text-muted-foreground sm:text-base">
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-foreground"
              >
                Categories
              </Link>
              <Link
                href="/search"
                className="transition-colors hover:text-foreground"
              >
                Search
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-foreground">For Writers</p>
            <div className="grid gap-2 text-sm text-muted-foreground sm:text-base">
              <Link
                href="/dashboard/author"
                className="transition-colors hover:text-foreground"
              >
                Become an Author
              </Link>
              <Link
                href="/dashboard/author/posts"
                className="transition-colors hover:text-foreground"
              >
                Author Dashboard
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-lg font-semibold text-foreground">Company</p>
            <div className="grid gap-2 text-sm text-muted-foreground sm:text-base">
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Privacy
              </Link>
              <Link
                href="/"
                className="transition-colors hover:text-foreground"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground sm:text-base">
          © 2026 ContentHub. All rights reserved.
        </div>
      </PageContainer>
    </footer>
  );
}
