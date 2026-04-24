import Link from "next/link";
import { PenBox } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderSearch } from "@/components/layout/header-search";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { UserDropdown } from "@/components/layout/user-dropdown";
const mobileNavItems = [
  { title: "Home", href: "/" },
  { title: "Search", href: "/search" },
  { title: "Feeds", href: "/feeds" },
  { title: "Write", href: "/write" },
  { title: "Library", href: "/library" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background),white_55%)]/80 backdrop-blur-xl">
      <PageContainer className="flex h-16 items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--primary)] text-white">
            <PenBox className="h-4 w-4" />
          </div>
          <p className="font-[var(--font-brand)] text-xl leading-none text-[var(--foreground)]">
            ContentHub
          </p>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Search
          </Link>
          <Link
            href="/feeds"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Feeds
          </Link>
          <Link
            href="/write"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Write
          </Link>
          <Link
            href="/library"
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          >
            Library
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

          <UserDropdown />

          <MobileNavDrawer title="Blind Archar" items={mobileNavItems} />
        </div>
      </PageContainer>
    </header>
  );
}
