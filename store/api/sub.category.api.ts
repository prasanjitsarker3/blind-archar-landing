import { TagTypes } from "@/types/tagTypes";
import { baseApi } from "../baseApi";
import type {
  SubCategory,
  SubCategoryListParams,
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
} from "@/types/category";
import type { PaginatedResponse } from "@/types/language";

export const subCategoryApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getSubCategories: build.query<PaginatedResponse<SubCategory>, SubCategoryListParams>({
      query: ({ page = 1, limit = 10, searchTerm, categoryId } = {}) => ({
        url: "/sub-categories",
        method: "GET",
        params: {
          page,
          limit,
          ...(searchTerm?.trim() && { searchTerm: searchTerm.trim() }),
          ...(categoryId && { categoryId }),
        },
      }),
      providesTags: [TagTypes.subCategory],
    }),

    getSubCategory: build.query<SubCategory, string>({
      query: (id) => ({
        url: `/sub-categories/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: TagTypes.subCategory, id }],
    }),

    createSubCategory: build.mutation<SubCategory, CreateSubCategoryDto>({
      query: (body) => ({
        url: "/sub-categories",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagTypes.subCategory],
    }),

    updateSubCategory: build.mutation<SubCategory, { id: string; body: UpdateSubCategoryDto }>({
      query: ({ id, body }) => ({
        url: `/sub-categories/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        TagTypes.subCategory,
        { type: TagTypes.subCategory, id },
      ],
    }),

    deleteSubCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/sub-categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.subCategory],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} = subCategoryApi;
