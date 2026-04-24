"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pendingPosts = [
  { title: "Writing Better Headlines", author: "Anita", status: "Review" },
  { title: "Design Tokens 101", author: "Ravi", status: "Review" },
  { title: "Reader Growth Metrics", author: "Sara", status: "Draft" },
];

export default function AdminDashboardPage() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Posts" value="1,284" delta="+12%" />
        <MetricCard title="Active Authors" value="73" delta="+4%" />
        <MetricCard title="Weekly Readers" value="92k" delta="+8%" />
        <MetricCard title="AI Drafts" value="267" delta="+31%" />
      </div>

      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">Content Management</TabsTrigger>
          <TabsTrigger value="ai">AI Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Pending Content</CardTitle>
              <CardDescription>
                Moderate and approve queued submissions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingPosts.map((post) => (
                <div
                  key={post.title}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] p-3"
                >
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      {post.title}
                    </p>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      By {post.author}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{post.status}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => toast.success("Post approved")}
                        >
                          Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toast.error("Post rejected")}
                        >
                          Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast("Open editor")}>
                          Open Editor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Panel</CardTitle>
              <CardDescription>
                Generate ideas, outlines, and social snippets.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="e.g. Generate a blog outline about accessible Hindi typography"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={() => toast.success("Outline generated")}>
                  Generate Outline
                </Button>
                <Button
                  variant="outline"
                  onClick={() => toast("Summary generated")}
                >
                  Generate Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({
  title,
  value,
  delta,
}: {
  title: string;
  value: string;
  delta: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="success">{delta}</Badge>
      </CardContent>
    </Card>
  );
}
