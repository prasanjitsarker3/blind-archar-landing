import { FileCog, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminContentPage() {
  return (
    <div className="space-y-4">
      <h2 className="font-[var(--font-brand)] text-3xl">Content Studio</h2>

      <Tabs defaultValue="management">
        <TabsList>
          <TabsTrigger value="management">Content Management</TabsTrigger>
          <TabsTrigger value="ai">AI Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="management">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCog className="h-5 w-5 text-[var(--primary)]" />
                Full Content Management
              </CardTitle>
              <CardDescription>
                Organize categories, workflows, and editorial policies.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-[var(--muted-foreground)]">
              This panel is prepared for bulk operations, version management,
              and editorial automation.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                AI Generation Panel
              </CardTitle>
              <CardDescription>
                Configure prompts and templates for editorial teams.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-[var(--muted-foreground)]">
              Ready to plug in model providers for prompt chaining, review
              routing, and output scoring.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
