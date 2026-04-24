import { CheckCircle2, Loader2, Sparkles, Trash2 } from "lucide-react";

import { AdminPanelTabs } from "@/components/layout/admin-panel-tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const queueItems = [
  {
    title: "The Impact of Quantum Computing on Cryptography",
    status: "COMPLETED",
    statusClass: "bg-emerald-100 text-emerald-800",
    meta: "Technology • English • Academic • Long",
    info: "Created 4/24/2026, 3:08:08 PM • Completed in 600s",
  },
  {
    title: "Sustainable Architecture in Urban Planning",
    status: "RUNNING",
    statusClass: "bg-blue-100 text-blue-700",
    meta: "Design • English • Professional • Medium",
    info: "Created 4/24/2026, 3:58:08 PM",
    progress: 60,
  },
  {
    title: "Machine Learning for Beginners",
    status: "QUEUED",
    statusClass: "bg-amber-100 text-amber-800",
    meta: "Technology • English • Casual • Short",
    info: "Created 4/24/2026, 4:03:08 PM",
  },
];

export default function AdminAIGeneratorPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="flex items-center gap-2 text-4xl font-[var(--font-brand)] leading-tight">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-100 text-violet-600">
            <Sparkles className="h-5 w-5" />
          </span>
          AI Content Generator
        </h2>
        <p className="text-2xl text-[var(--muted-foreground)]">
          Generate high-quality articles using AI. Only available to
          administrators.
        </p>
      </header>

      <AdminPanelTabs />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Jobs"
          value="3"
          valueClass="text-[var(--foreground)]"
        />
        <StatCard title="Active" value="2" valueClass="text-blue-600" />
        <StatCard title="Completed" value="1" valueClass="text-emerald-600" />
        <StatCard title="Failed" value="0" valueClass="text-rose-600" />
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-4xl">
              <Sparkles className="h-5 w-5" />
              New Generation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-lg font-semibold">Topic or Title</label>
              <textarea
                placeholder="e.g., The Future of Renewable Energy in Developing Nations"
                className="min-h-24 w-full rounded-xl border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-lg text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--ring)]"
              />
            </div>

            {[
              ["Category", "Technology"],
              ["Language", "English"],
              ["Tone", "Professional"],
              ["Target Length", "Medium (5-10 min read)"],
            ].map(([label, value]) => (
              <div className="space-y-2" key={label}>
                <label className="text-lg font-semibold">{label}</label>
                <select className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--muted)] px-3 text-lg outline-none focus:ring-2 focus:ring-[var(--ring)]">
                  <option>{value}</option>
                </select>
              </div>
            ))}

            <div className="space-y-2 border-t border-[var(--border)] pt-3 text-lg">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Include images
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked /> Add source citations
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Multi-column layout
              </label>
            </div>

            <Button className="h-12 w-full text-xl">Generate Content</Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-4xl font-[var(--font-brand)] leading-tight">
            Generation Queue
          </h3>
          <Card className="border-blue-200 bg-blue-50/70">
            <CardContent className="flex items-center gap-3 p-5 text-xl font-semibold text-blue-700">
              <Loader2 className="h-5 w-5 animate-spin" />2 jobs in progress
            </CardContent>
          </Card>

          {queueItems.map((item) => (
            <Card key={item.title}>
              <CardContent className="space-y-3 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    {item.status === "COMPLETED" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : item.status === "RUNNING" ? (
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    ) : (
                      <span className="h-5 w-5 rounded-full border border-amber-600" />
                    )}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${item.statusClass}`}
                    >
                      {item.status}
                    </span>
                    {item.status === "COMPLETED" ? (
                      <span>8 sources</span>
                    ) : null}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete queue item"
                  >
                    <Trash2 className="h-4 w-4 text-rose-500" />
                  </Button>
                </div>

                <p className="text-3xl font-[var(--font-brand)] leading-tight">
                  {item.title}
                </p>
                <p className="text-lg text-[var(--muted-foreground)]">
                  {item.meta}
                </p>
                <p className="text-base text-[var(--muted-foreground)]">
                  {item.info}
                </p>

                {typeof item.progress === "number" ? (
                  <div className="space-y-2">
                    <div className="h-1.5 rounded-full bg-[var(--muted)]">
                      <div
                        className="h-1.5 rounded-full bg-blue-600"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-base text-[var(--muted-foreground)]">
                      Generating content and gathering sources...
                    </p>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  valueClass,
}: {
  title: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription className="text-xl">{title}</CardDescription>
        <CardTitle className={`text-5xl ${valueClass ?? ""}`}>
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
