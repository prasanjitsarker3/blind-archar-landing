"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type MobileNavItem = {
  title: string;
  href: string;
};

type MobileNavDrawerProps = {
  title: string;
  items: MobileNavItem[];
};

export function MobileNavDrawer({ title, items }: MobileNavDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="left-0 top-0 h-dvh w-[88vw] max-w-xs translate-x-0 translate-y-0 rounded-none border-r border-[var(--border)] p-0">
        <DialogHeader className="border-b border-[var(--border)] p-5 text-left">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>Choose where to go next.</DialogDescription>
        </DialogHeader>

        <nav className="grid gap-2 p-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </DialogContent>
    </Dialog>
  );
}
