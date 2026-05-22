import { PenSquare } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function WritePage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-3">
          <PenSquare className="h-6 w-6 text-[var(--primary)]" />
          <h1 className="text-4xl font-[var(--font-brand)] leading-tight">
            Write
          </h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">
          This public route is ready to hand off to the authenticated writing
          experience.
        </p>
      </div>
    </PageContainer>
  );
}
