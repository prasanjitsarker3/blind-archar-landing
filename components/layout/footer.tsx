import { PageContainer } from "@/components/layout/page-container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--card)]/70 py-10">
      <PageContainer className="grid gap-6 text-sm text-[var(--muted-foreground)] md:grid-cols-3">
        <div>
          <p className="font-[var(--font-brand)] text-lg text-[var(--foreground)]">
            Blind Archar
          </p>
          <p>Modern Hindi-first publishing platform.</p>
        </div>
        <div>
          <p className="font-medium text-[var(--foreground)]">Explore</p>
          <p className="mt-2">Blog, Guides, Author Stories</p>
        </div>
        <div>
          <p className="font-medium text-[var(--foreground)]">Built With</p>
          <p className="mt-2">Next.js, TypeScript, Tailwind, shadcn/ui</p>
        </div>
      </PageContainer>
    </footer>
  );
}
