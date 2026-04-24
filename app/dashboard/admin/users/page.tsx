import { ShieldCheck, UserRound } from "lucide-react";

import { AdminPanelTabs } from "@/components/layout/admin-panel-tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const users = [
  { name: "Alex Morgan", role: "Admin", status: "Active" },
  { name: "Emma Wilson", role: "Author", status: "Active" },
  { name: "Noah Reed", role: "Reader", status: "Pending" },
  { name: "Anita Patel", role: "Author", status: "Active" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-4xl font-[var(--font-brand)] leading-tight">
          User Management
        </h2>
        <p className="text-xl text-[var(--muted-foreground)]">
          Manage reader, author, and admin accounts.
        </p>
      </header>

      <AdminPanelTabs />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
            Platform Users
          </CardTitle>
          <CardDescription className="text-base">
            Keep account roles and moderation access in sync.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {users.map((user) => (
            <div
              key={user.name}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--muted)]">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{user.name}</p>
                  <p className="text-sm text-[var(--muted-foreground)]">
                    {user.role}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  user.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {user.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
