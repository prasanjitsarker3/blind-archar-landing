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

export type SubCategory = {
  id: string;
  name: string;
  slug: string;
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id: string;
    name: string;
  };
};

export type SubCategoryListParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  categoryId?: string;
};

export type CreateSubCategoryDto = {
  name: string;
  categoryId: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
  order?: number;
};

export type UpdateSubCategoryDto = Partial<CreateSubCategoryDto>;

export type { PaginatedResponse, PaginationMeta };
