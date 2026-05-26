import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SubCategory } from "@/types/category";

type ViewSubCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subCategory: SubCategory;
};

export function ViewSubCategoryDialog({
  open,
  onOpenChange,
  subCategory,
}: ViewSubCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Sub Category Details</DialogTitle>
          <DialogDescription>
            Read-only view of this sub category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
          <Row label="Name" value={subCategory.name} />
          <Row
            label="Slug"
            value={
              <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold tracking-wide">
                {subCategory.slug}
              </span>
            }
          />
          {subCategory.category?.name && (
            <Row
              label="Category"
              value={
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {subCategory.category.name}
                </span>
              }
            />
          )}
          {subCategory.createdAt && (
            <Row
              label="Created At"
              value={new Date(subCategory.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            />
          )}
          <Row
            label="ID"
            value={
              <span className="font-mono text-xs text-muted-foreground">
                {subCategory.id}
              </span>
            }
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
