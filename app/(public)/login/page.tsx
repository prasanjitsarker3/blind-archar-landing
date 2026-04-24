import Link from "next/link";
import { LogIn } from "lucide-react";

import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <PageContainer className="py-12 sm:py-16">
      <div className="mx-auto max-w-md space-y-5 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <LogIn className="h-6 w-6 text-[var(--primary)]" />
          <h1 className="text-4xl font-[var(--font-brand)] leading-tight">
            Login
          </h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">
          Sign in to access writing tools and your profile.
        </p>
        <Button asChild className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
