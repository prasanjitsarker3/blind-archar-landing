"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, PenBox } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { HeaderSearch } from "@/components/layout/header-search";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/page-container";
import { UserDropdown } from "@/components/layout/user-dropdown";
import { useAppSelector } from "@/store/hooks";

const collectionMenus = [
  {
    title: "Articles",
    categories: ["Tech", "Life", "News"],
  },
  {
    title: "Blogs",
    categories: ["Trending", "Popular", "Recent"],
  },
  {
    title: "Guides",
    categories: ["Beginner", "How To", "Tips"],
  },
  {
    title: "Topics",
    categories: ["Design", "Business", "Startup"],
  },
  {
    title: "Writers",
    categories: ["Editors", "Authors", "Guest"],
  },
  {
    title: "Series",
    categories: ["Weekly", "Case Study", "Deep Dive"],
  },
];

const mobileNavItems = [
  { title: "Home", href: "/" },
  { title: "Search", href: "/search" },
  { title: "Feeds", href: "/feeds" },
  { title: "Write", href: "/write" },
  { title: "Library", href: "/library" },
  ...collectionMenus.map((menu) => ({
    title: menu.title,
    href: "/blog",
  })),
];

export function Navbar() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenuNow = (menuTitle: string) => {
    clearCloseTimer();
    setOpenMenu(menuTitle);
  };

  const closeMenuSoon = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenMenu(null);
      closeTimerRef.current = null;
    }, 220);
  };

  return (
    <header className="sticky top-0 z-40  bg-[color-mix(in_oklab,var(--background),white_55%)]/80 backdrop-blur-xl">
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
          {isAuthenticated ? (
            <>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link href="/dashboard/author/posts/new">Start Writing</Link>
              </Button>
              <UserDropdown />
            </>
          ) : (
            <GoogleSignInButton />
          )}

          <MobileNavDrawer title="Blind Archar" items={mobileNavItems} />
        </div>
      </PageContainer>
      <PageContainer className="hidden border-t border-border md:block">
        <nav
          aria-label="Collections under categories"
          className="flex h-10 items-center gap-1 text-sm"
        >
          {collectionMenus.map((menu, index) => (
            <div
              key={menu.title}
              className="relative flex items-center"
              onMouseEnter={() => openMenuNow(menu.title)}
              onMouseLeave={closeMenuSoon}
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-md px-2 text-xs font-medium tracking-[0.01em] text-[var(--muted-foreground)] uppercase hover:text-[var(--foreground)]"
              >
                {menu.title}
              </Button>

              <div
                className={`absolute left-0 top-[calc(100%-1px)] z-50 min-w-44 rounded-xl border border-border bg-[var(--card)] p-2 shadow-md transition-all duration-200 ${
                  openMenu === menu.title
                    ? "visible translate-y-1 opacity-100"
                    : "invisible -translate-y-1 opacity-0"
                }`}
              >
                <p className="px-2 py-1 text-xs font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">
                  Categories
                </p>
                <div className="mt-1 grid gap-1">
                  {menu.categories.map((category) => (
                    <Link
                      key={`${menu.title}-${category}`}
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      className="block rounded-md px-2 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {index < collectionMenus.length - 1 ? (
                <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)]/70" />
              ) : null}
            </div>
          ))}
        </nav>
      </PageContainer>

      <PageContainer className="border-t border-border py-2 md:hidden">
        <p className="text-xs font-semibold tracking-wide text-[var(--muted-foreground)] uppercase">
          Collections in menu sidebar
        </p>
      </PageContainer>
    </header>
  );
}
