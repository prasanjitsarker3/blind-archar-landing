"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewAuthorPostPage() {
  const [title, setTitle] = useState("");

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>Create / Edit Post</CardTitle>
        <CardDescription>
          Use a simple, distraction-free editor shell.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Title
          </label>
          <Input
            id="title"
            value={title}
            placeholder="e.g. Future of Hindi Web Publishing"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-[var(--foreground)]">
            Category
          </p>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Tech</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="excerpt"
            className="text-sm font-medium text-[var(--foreground)]"
          >
            Excerpt
          </label>
          <textarea
            id="excerpt"
            rows={5}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            placeholder="Write a short summary..."
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => toast.info("Draft saved locally")}
          >
            Save Draft
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button>Publish</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish this post?</DialogTitle>
                <DialogDescription>
                  This will make your article visible in the public blog
                  listing.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button
                  variant="success"
                  onClick={() => toast.success("Post published successfully")}
                >
                  Confirm Publish
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
