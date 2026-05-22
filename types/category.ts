import type { PaginatedResponse, PaginationMeta } from "./language";

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type CategoryListParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export type CreateCategoryDto = {
  name: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
  order?: number;
};

export type UpdateCategoryDto = Partial<CreateCategoryDto>;

export type { PaginatedResponse, PaginationMeta };
