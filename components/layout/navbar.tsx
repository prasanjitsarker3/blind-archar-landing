import Link from "next/link";
import { PenBox } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderSearch } from "@/components/layout/header-search";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";

const mobileNavItems = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
  { title: "Author Dashboard", href: "/dashboard/author" },
  { title: "Admin Dashboard", href: "/dashboard/admin" },
  { title: "Start Writing", href: "/dashboard/author/posts/new" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background),white_55%)]/80 backdrop-blur-xl">
      <PageContainer className="flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--primary)] text-white">
            <PenBox className="h-4 w-4" />
          </div>
          <div>
            <p className="font-[var(--font-brand)] text-xl leading-none text-[var(--foreground)]">
              Blind Archar
            </p>
            <p className="text-xs text-[var(--muted-foreground)]">
              Next Writing Platform
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/blog"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Blog
          </Link>
          <Link
            href="/dashboard/author"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Author
          </Link>
          <Link
            href="/dashboard/admin"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <HeaderSearch />
          </div>
          <div className="lg:hidden">
            <HeaderSearch compact />
          </div>
          <ThemeToggle />
          <GoogleSignInButton />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/dashboard/author/posts/new">Start Writing</Link>
          </Button>
          <MobileNavDrawer title="Blind Archar" items={mobileNavItems} />
        </div>
      </PageContainer>
    </header>
  );
}
