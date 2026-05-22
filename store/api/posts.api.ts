import { TagTypes } from "@/types/tagTypes";
import { baseApi } from "../baseApi";

export type Post = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  status: "draft" | "pending" | "published";
  tags: string[];
  views: number;
  readTime: number;
  createdAt: string;
  updatedAt: string;
};

export type PostsListResponse = {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
};

export type CreatePostRequest = Pick<
  Post,
  "title" | "content" | "excerpt" | "tags"
>;
export type UpdatePostRequest = Partial<CreatePostRequest> & { id: string };

export const postsApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getPosts: build.query<
      PostsListResponse,
      { page?: number; pageSize?: number; status?: Post["status"] }
    >({
      query: ({ page = 1, pageSize = 10, status } = {}) => ({
        url: "/posts",
        params: { page, pageSize, ...(status && { status }) },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: TagTypes.post as const, id })),
              { type: TagTypes.post, id: "LIST" },
            ]
          : [{ type: TagTypes.post, id: "LIST" }],
    }),

    getPost: build.query<Post, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: TagTypes.post, id }],
    }),

    createPost: build.mutation<Post, CreatePostRequest>({
      query: (body) => ({ url: "/posts", method: "POST", body }),
      invalidatesTags: [{ type: TagTypes.post, id: "LIST" }],
    }),

    updatePost: build.mutation<Post, UpdatePostRequest>({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: TagTypes.post, id }],
    }),

    deletePost: build.mutation<void, string>({
      query: (id) => ({ url: `/posts/${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [
        { type: TagTypes.post, id },
        { type: TagTypes.post, id: "LIST" },
      ],
    }),

    uploadCover: build.mutation<{ url: string }, FormData>({
      query: (formData) => ({
        url: "/posts/upload-cover",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUploadCoverMutation,
} = postsApi;
