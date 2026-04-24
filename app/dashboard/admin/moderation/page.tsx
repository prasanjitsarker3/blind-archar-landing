import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ModerationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
          Moderation Queue
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted-foreground)]">
          Policy checks and abuse reports are centralized here.
        </p>
        <Badge variant="secondary">12 pending</Badge>
      </CardContent>
    </Card>
  );
}
