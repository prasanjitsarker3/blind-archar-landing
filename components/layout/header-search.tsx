"use client";

import Link from "next/link";
import { Search } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const quickLinks = [
  { title: "Open Blog", href: "/blog" },
  { title: "Author Dashboard", href: "/dashboard/author" },
  { title: "Admin Dashboard", href: "/dashboard/admin" },
  { title: "Create New Post", href: "/dashboard/author/posts/new" },
];

type HeaderSearchProps = {
  compact?: boolean;
};

export function HeaderSearch({ compact = false }: HeaderSearchProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex h-11 items-center gap-3 rounded-2xl bg-[var(--muted)] px-4 text-left text-[var(--muted-foreground)] transition-colors hover:bg-[color-mix(in_oklab,var(--muted),black_6%)]"
          aria-label="Open search"
        >
          <Search className="h-5 w-5 text-[var(--foreground)]" />
          {!compact && (
            <>
              <span className="text-2xl leading-none opacity-40">|</span>
              <span className="text-base font-semibold">Search...</span>
            </>
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl p-0">
        <DialogHeader className="border-b border-[var(--border)] p-5">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Quickly jump to dashboard pages, posts, and common actions.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 p-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
            <Input
              autoFocus
              placeholder="Type a page or action, e.g. blog, post, admin"
              className="pl-9"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
              Quick navigation
            </p>
            <div className="grid gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
