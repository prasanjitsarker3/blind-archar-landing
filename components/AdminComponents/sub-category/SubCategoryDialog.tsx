"use client";

import { useEffect, useMemo, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
import { SearchableCombobox } from "@/components/ui/searchable-combobox";
import { cn } from "@/lib/utils";
import {
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "@/store/api/sub.category.api";
import { useGetCategoriesQuery } from "@/store/api/category.api";
import {
  subCategorySchema,
  type SubCategoryFormValues,
} from "@/lib/validations/sub-category";
import type { SubCategory } from "@/types/category";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

type SubCategoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subCategory?: SubCategory;
};

export function SubCategoryDialog({
  open,
  onOpenChange,
  subCategory,
}: SubCategoryDialogProps) {
  const isEdit = !!subCategory;
  const slugLocked = useRef(isEdit);

  const [createSubCategory, { isLoading: isCreating }] =
    useCreateSubCategoryMutation();
  const [updateSubCategory, { isLoading: isUpdating }] =
    useUpdateSubCategoryMutation();
  const isLoading = isCreating || isUpdating;

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({ limit: 100 });

  const categoryOptions = useMemo(
    () =>
      (categoriesData?.data ?? []).map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    [categoriesData],
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm<SubCategoryFormValues>({
    resolver: zodResolver(subCategorySchema),
    defaultValues: { name: "", slug: "", categoryId: "" },
  });

  const nameValue = useWatch({ control, name: "name" });

  useEffect(() => {
    if (!slugLocked.current) {
      setValue("slug", slugify(nameValue ?? ""), { shouldValidate: false });
    }
  }, [nameValue, setValue]);

  useEffect(() => {
    if (open) {
      slugLocked.current = isEdit;
      reset(
        isEdit
          ? {
              name: subCategory.name,
              slug: subCategory.slug,
              categoryId: subCategory.categoryId ?? "",
            }
          : { name: "", slug: "", categoryId: "" },
      );
    }
  }, [open, isEdit, subCategory, reset]);

  const { onChange: onSlugChange, ...slugRegistration } = register("slug");

  const onSubmit = async (values: SubCategoryFormValues) => {
    try {
      const payload = {
        name: values.name,
        categoryId: values.categoryId,
        ...(values.slug?.trim() && { slug: values.slug.trim() }),
      };

      if (isEdit) {
        await updateSubCategory({ id: subCategory.id, body: payload }).unwrap();
      } else {
        await createSubCategory(payload).unwrap();
      }

      onOpenChange(false);
    } catch (err: unknown) {
      const apiMessage = (err as { data?: { message?: string } })?.data
        ?.message;
      if (apiMessage) {
        toast.error(apiMessage);
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Sub Category" : "Create Sub Category"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the sub category details below."
              : "Fill in the details to create a new sub category."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          <Field
            label="Category"
            id="categoryId"
            error={errors.categoryId?.message}
          >
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <SearchableCombobox
                  id="categoryId"
                  options={categoryOptions}
                  value={field.value}
                  onChange={field.onChange}
                  loading={isLoadingCategories}
                  invalid={!!errors.categoryId}
                  placeholder="Select a category"
                  searchPlaceholder="Search categories…"
                  emptyMessage="No categories found."
                />
              )}
            />
          </Field>

          <Field label="Name" id="name" error={errors.name?.message}>
            <Input
              id="name"
              placeholder="e.g. History"
              className={cn(
                errors.name &&
                  "border-destructive focus-visible:ring-destructive",
              )}
              {...register("name")}
            />
          </Field>

          <Field label="Slug" id="slug" error={errors.slug?.message}>
            <Input
              id="slug"
              placeholder="e.g. history"
              className="font-mono text-sm"
              {...slugRegistration}
              onChange={(e) => {
                slugLocked.current = e.target.value.length > 0;
                onSlugChange(e);
              }}
            />
            <p className="text-xs text-muted-foreground">
              Auto-generated from name. You can override it.
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
