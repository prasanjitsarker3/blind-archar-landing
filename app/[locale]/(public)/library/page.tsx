import { Bookmark } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function LibraryPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-3">
          <Bookmark className="h-6 w-6 text-[var(--primary)]" />
          <h1 className="text-4xl font-[var(--font-brand)] leading-tight">
            Library
          </h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">
          Saved stories, reading lists, and bookmarked content can live here.
        </p>
      </div>
    </PageContainer>
  );
}
