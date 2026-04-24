import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AuthorSettingsPage() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Author Settings</CardTitle>
        <CardDescription>
          Manage profile visibility and writing preferences.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-[var(--muted-foreground)]">
        Settings UI intentionally kept modular for future account and
        notification controls.
      </CardContent>
    </Card>
  );
}
