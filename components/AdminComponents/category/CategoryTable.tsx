"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Eye, Trash2 } from "lucide-react";

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
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/store/api/category.api";
import { useDebounce } from "@/hooks/use-debounce";
import type { Category } from "@/types/category";

// ── Row actions ───────────────────────────────────────────────
function RowActions({
  category,
  onDelete,
}: {
  category: Category;
  onDelete: (id: string) => void;
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
        <DropdownMenuItem className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive focus:text-destructive"
          onSelect={() => onDelete(category.id)}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── Main table ────────────────────────────────────────────────
const CategoryTable = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const search = useDebounce(searchInput, 400);

  const { data, isLoading, isFetching } = useGetCategoriesQuery({
    page,
    limit: 10,
    searchTerm: search,
  });

  const [deleteCategory] = useDeleteCategoryMutation();

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await deleteCategory(id);
  };

  const isStale = isFetching && !isLoading;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <TableSearch
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search categories…"
        />
        {data?.meta && (
          <p className="shrink-0 text-sm text-muted-foreground">
            {data.meta.total} result{data.meta.total !== 1 ? "s" : ""}
          </p>
        )}
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
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton rows={10} columns={3} />
              ) : data?.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-12 text-center text-muted-foreground"
                  >
                    {searchInput
                      ? `No categories matched "${searchInput}".`
                      : "No categories found."}
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((category) => (
                  <TableRow key={category.id} className="hover:bg-muted/40">
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold tracking-wide">
                        {category.slug}
                      </span>
                    </TableCell>
                    <TableCell>
                      <RowActions category={category} onDelete={handleDelete} />
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
    </div>
  );
};

export default CategoryTable;
