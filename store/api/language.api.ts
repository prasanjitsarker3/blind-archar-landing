import { TagTypes } from "@/types/tagTypes";
import { baseApi } from "../baseApi";
import type { Language, PaginatedResponse } from "@/types/language";

export type LanguageListParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export const languageApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getLanguages: build.query<PaginatedResponse<Language>, LanguageListParams>({
      query: ({ page = 1, limit = 10, searchTerm } = {}) => ({
        url: "/languages",
        method: "GET",
        params: {
          page,
          limit,
          ...(searchTerm?.trim() && { searchTerm: searchTerm.trim() }),
        },
      }),
      providesTags: [TagTypes.language],
    }),

    deleteLanguage: build.mutation<void, string>({
      query: (id) => ({
        url: `/languages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.language],
    }),
  }),
});

export const { useGetLanguagesQuery, useDeleteLanguageMutation } = languageApi;
