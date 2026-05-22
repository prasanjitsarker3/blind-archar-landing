import { TagTypes } from "@/types/tagTypes";
import { baseApi } from "../baseApi";
import type {
  Category,
  CategoryListParams,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";
import type { PaginatedResponse } from "@/types/language";

export const categoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getCategories: build.query<PaginatedResponse<Category>, CategoryListParams>({
      query: ({ page = 1, limit = 10, searchTerm } = {}) => ({
        url: "/categories",
        method: "GET",
        params: {
          page,
          limit,
          ...(searchTerm?.trim() && { searchTerm: searchTerm.trim() }),
        },
      }),
      providesTags: [TagTypes.category],
    }),

    getCategory: build.query<Category, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: TagTypes.category, id }],
    }),

    createCategory: build.mutation<Category, CreateCategoryDto>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagTypes.category],
    }),

    updateCategory: build.mutation<Category, { id: string; body: UpdateCategoryDto }>({
      query: ({ id, body }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        TagTypes.category,
        { type: TagTypes.category, id },
      ],
    }),

    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.category],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
