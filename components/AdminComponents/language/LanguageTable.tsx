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
import { Badge } from "@/components/ui/badge";
import { DataPagination } from "@/components/ui/data-pagination";
import { TableSearch } from "@/components/ui/table-search";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import {
  useGetLanguagesQuery,
  useDeleteLanguageMutation,
} from "@/store/api/language.api";
import { useDebounce } from "@/hooks/use-debounce";
import type { Language } from "@/types/language";

// ── Row actions ───────────────────────────────────────────────
function RowActions({
  language,
  onDelete,
}: {
  language: Language;
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
          onSelect={() => onDelete(language.id)}
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ── Main table ────────────────────────────────────────────────
const LanguageTable = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const search = useDebounce(searchInput, 400);

  const { data, isLoading, isFetching } = useGetLanguagesQuery({
    page,
    limit: 10,
    searchTerm: search,
  });

  const [deleteLanguage] = useDeleteLanguageMutation();

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1); // reset to first page on new search
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this language?")) return;
    await deleteLanguage(id);
  };

  const isStale = isFetching && !isLoading;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <TableSearch
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search languages…"
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
                <TableHead className="w-12">Flag</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Native Name</TableHead>
                <TableHead>Locale</TableHead>
                <TableHead className="text-center">RTL</TableHead>
                <TableHead className="text-center">Order</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableSkeleton rows={10} columns={9} />
              ) : data?.data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-12 text-center text-muted-foreground"
                  >
                    {searchInput
                      ? `No languages matched "${searchInput}".`
                      : "No languages found."}
                  </TableCell>
                </TableRow>
              ) : (
                data?.data.map((lang) => (
                  <TableRow key={lang.id} className="hover:bg-muted/40">
                    <TableCell className="text-2xl">{lang.flagEmoji}</TableCell>
                    <TableCell>
                      <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider">
                        {lang.code}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{lang.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {lang.nativeName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {lang.locale}
                    </TableCell>
                    <TableCell className="text-center">
                      {lang.isRTL ? (
                        <Badge variant="secondary">RTL</Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {lang.order}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={lang.isActive ? "default" : "secondary"}
                        className={
                          lang.isActive
                            ? "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20"
                            : ""
                        }
                      >
                        {lang.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <RowActions language={lang} onDelete={handleDelete} />
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

export default LanguageTable;
