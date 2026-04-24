import Link from "next/link";
import { PenBox } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-14 sm:py-20">
      <PageContainer className="space-y-12">
        <div className="grid gap-10 md:grid-cols-[1.25fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#09071d] text-white">
                <PenBox className="h-5 w-5" />
              </div>
              <p className="text-2xl font-[var(--font-brand)] font-semibold text-[var(--foreground)]">
                ContentHub
              </p>
            </div>
            <p className="max-w-sm text-xl leading-relaxed text-[var(--muted-foreground)]">
              A modern content publishing platform for writers and readers.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-[var(--font-brand)] font-semibold text-[var(--foreground)]">
              Platform
            </p>
            <div className="grid gap-3 text-xl text-[var(--muted-foreground)]">
              <Link href="/">Home</Link>
              <Link href="/blog">Categories</Link>
              <Link href="/blog">Search</Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-[var(--font-brand)] font-semibold text-[var(--foreground)]">
              For Writers
            </p>
            <div className="grid gap-3 text-xl text-[var(--muted-foreground)]">
              <Link href="/dashboard/author">Become an Author</Link>
              <Link href="/dashboard/author/posts">Author Dashboard</Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-[var(--font-brand)] font-semibold text-[var(--foreground)]">
              Company
            </p>
            <div className="grid gap-3 text-xl text-[var(--muted-foreground)]">
              <Link href="/">About</Link>
              <Link href="/">Privacy</Link>
              <Link href="/">Terms</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-10 text-center text-xl text-[var(--muted-foreground)]">
          © 2026 ContentHub. All rights reserved.
        </div>
      </PageContainer>
    </footer>
  );
}
