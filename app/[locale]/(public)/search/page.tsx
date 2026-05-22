import { Search } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function SearchPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-3">
          <Search className="h-6 w-6 text-[var(--primary)]" />
          <h1 className="text-4xl font-[var(--font-brand)] leading-tight">
            Search
          </h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">
          Search stories, authors, and topics across the public platform.
        </p>
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-[var(--muted-foreground)]">
          Search UI placeholder ready for filters, results, and recent queries.
        </div>
      </div>
    </PageContainer>
  );
}
