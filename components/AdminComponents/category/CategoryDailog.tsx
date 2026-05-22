"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/api/category.api";
import { categorySchema, type CategoryFormValues } from "@/lib/validations/category";
import type { Category } from "@/types/category";

// ── Field ─────────────────────────────────────────────────────

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CategoryDialog  (create + edit)
// ─────────────────────────────────────────────────────────────

type CategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category;
};

export function CategoryDialog({
  open,
  onOpenChange,
  category,
}: CategoryDialogProps) {
  const isEdit = !!category;

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "", slug: "" },
  });

  useEffect(() => {
    if (open) {
      reset(
        isEdit
          ? { name: category.name, slug: category.slug }
          : { name: "", slug: "" },
      );
    }
  }, [open, isEdit, category, reset]);

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      const payload = {
        name: values.name,
        ...(values.slug?.trim() && { slug: values.slug.trim() }),
      };

      if (isEdit) {
        await updateCategory({ id: category.id, body: payload }).unwrap();
      } else {
        await createCategory(payload).unwrap();
      }

      onOpenChange(false);
    } catch {
      setError("root", { message: "Something went wrong. Please try again." });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Create Category"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the category details below."
              : "Fill in the details to create a new category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Field label="Name" id="name" error={errors.name?.message}>
            <Input
              id="name"
              placeholder="e.g. Health & Fitness"
              className={cn(
                errors.name && "border-destructive focus-visible:ring-destructive",
              )}
              {...register("name")}
            />
          </Field>

          <Field label="Slug" id="slug" error={errors.slug?.message}>
            <Input
              id="slug"
              placeholder="e.g. health-fitness"
              className="font-mono text-sm"
              {...register("slug")}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to auto-generate from name.
            </p>
          </Field>

          {errors.root && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errors.root.message}
            </p>
          )}

          <DialogFooter className="pt-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────
// ViewCategoryDialog
// ─────────────────────────────────────────────────────────────

type ViewCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
};

export function ViewCategoryDialog({
  open,
  onOpenChange,
  category,
}: ViewCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>Read-only view of this category.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
          <Row label="Name" value={category.name} />
          <Row
            label="Slug"
            value={
              <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold tracking-wide">
                {category.slug}
              </span>
            }
          />
          <Row label="ID" value={<span className="font-mono text-xs text-muted-foreground">{category.id}</span>} />
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

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DeleteCategoryDialog
// ─────────────────────────────────────────────────────────────

type DeleteCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
};

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
  onConfirm,
  isLoading = false,
}: DeleteCategoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">{category.name}</span>?
        </p>

        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={onConfirm}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
