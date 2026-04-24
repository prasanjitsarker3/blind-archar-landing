"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import { SidebarItem, SidebarNavList } from "@/components/layout/sidebar-nav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type MobileSidebarDrawerProps = {
  title: string;
  items: SidebarItem[];
};

export function MobileSidebarDrawer({
  title,
  items,
}: MobileSidebarDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open sidebar menu"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="left-0 top-0 h-dvh w-[88vw] max-w-xs translate-x-0 translate-y-0 rounded-none border-r border-[var(--border)] p-0">
        <DialogHeader className="border-b border-[var(--border)] p-5 text-left">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>
            Navigate dashboard sections quickly.
          </DialogDescription>
        </DialogHeader>

        <div className="pt-3">
          <SidebarNavList items={items} onNavigate={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
