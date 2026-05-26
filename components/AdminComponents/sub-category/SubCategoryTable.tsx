"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Eye, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DataPagination } from "@/components/ui/data-pagination";
import { TableSearch } from "@/components/ui/table-search";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import {
  useGetSubCategoriesQuery,
  useDeleteSubCategoryMutation,
} from "@/store/api/sub.category.api";
import { useDebounce } from "@/hooks/use-debounce";
import type { SubCategory } from "@/types/category";
import { SubCategoryDialog } from "./SubCategoryDialog";
import { ViewSubCategoryDialog } from "./SubCategoryView";
import { DeleteConfirmDialog } from "@/components/ui/delete-confirm-dialog";

function RowActions({
  subCategory,
  onView,
  onEdit,
  onDelete,
}: {
  subCategory: SubCategory;
  onView: (s: SubCategory) => void;
  onEdit: (s: SubCategory) => void;
  onDelete: (s: SubCategory) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={() => onView(subCategory)}
        >
          <Eye className="h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={() => onEdit(subCategory)}
        >
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive focus:text-destructive"
          onSelect={() => onDelete(subCategory)}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const SubCategoryTable = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<SubCategory | null>(null);
  const [viewTarget, setViewTarget] = useState<SubCategory | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SubCategory | null>(null);

  const search = useDebounce(searchInput, 400);

  const { data, isLoading, isFetching } = useGetSubCategoriesQuery({
    page,
    limit: 10,
    searchTerm: search,
  });

  const [deleteSubCategory, { isLoading: isDeleting }] =
    useDeleteSubCategoryMutation();

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteSubCategory(deleteTarget.id).unwrap();
      setDeleteTarget(null);
    } catch (err: unknown) {
      const apiMessage = (err as { data?: { message?: string } })?.data?.message;
      toast.error(
        apiMessage ?? "Failed to delete sub category. Please try again.",
      );
    }
  };

  const isStale = isFetching && !isLoading;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <TableSearch
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search sub categories…"
        />
        <div className="flex items-center gap-3">
          {data?.meta && (
            <p className="shrink-0 text-sm text-muted-foreground">
              {data.meta.total} result{data.meta.total !== 1 ? "s" : ""}
            </p>
          )}
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="mr-1.5 h-4 w-4" />
            New Sub Category
          </Button>
        </div>
      </div>

      {/* Table card */}
      <div
        className={`rounded-xl border border-border bg-card transition-opacity duration-200 ${isStale ? "opacity-60" : "opacity-100"}`}
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton rows={10} columns={5} />
              ) : data?.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-12 text-center text-muted-foreground"
                  >
                    {searchInput
                      ? `No sub categories matched "${searchInput}".`
                      : "No sub categories found."}
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((subCategory) => (
                  <TableRow key={subCategory.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium">
                      {subCategory.name}
                    </TableCell>
                    <TableCell>
                      <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold tracking-wide">
                        {subCategory.slug}
                      </span>
                    </TableCell>
                    <TableCell>
                      {subCategory.category?.name ? (
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {subCategory.category.name}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {subCategory.createdAt
                        ? new Date(subCategory.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" },
                          )
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <RowActions
                        subCategory={subCategory}
                        onView={setViewTarget}
                        onEdit={setEditTarget}
                        onDelete={setDeleteTarget}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {data?.meta && data.meta.totalPages > 1 && (
          <div className="border-t border-border">
            <DataPagination meta={data.meta} onPageChange={setPage} />
          </div>
        )}
      </div>

      {/* Create dialog */}
      <SubCategoryDialog open={createOpen} onOpenChange={setCreateOpen} />

      {/* Edit dialog */}
      {editTarget && (
        <SubCategoryDialog
          open={!!editTarget}
          onOpenChange={(open) => !open && setEditTarget(null)}
          subCategory={editTarget}
        />
      )}

      {/* View dialog */}
      {viewTarget && (
        <ViewSubCategoryDialog
          open={!!viewTarget}
          onOpenChange={(open) => !open && setViewTarget(null)}
          subCategory={viewTarget}
        />
      )}

      {/* Delete dialog */}
      {deleteTarget && (
        <DeleteConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
          itemName={deleteTarget.name}
          title="Delete Sub Category"
          onConfirm={handleConfirmDelete}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default SubCategoryTable;
