import { UserRound } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";

export default function ProfilePage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-3">
          <UserRound className="h-6 w-6 text-[var(--primary)]" />
          <h1 className="text-4xl font-[var(--font-brand)] leading-tight">
            Profile
          </h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">
          Profile details and saved reading history can live here for logged-in
          users.
        </p>
      </div>
    </PageContainer>
  );
}
