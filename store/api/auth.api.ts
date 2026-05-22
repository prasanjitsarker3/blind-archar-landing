import Cookies from "js-cookie";

import { TagTypes, TagTypeList } from "@/types/tagTypes";
import { baseApi } from "../baseApi";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from "./base-query";
import { logout as clearAuth } from "@/store/slices/auth.slice";
import type { AuthUser } from "@/store/slices/auth.slice";

export type LoginRequest = { email: string; password: string };
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
  user: AuthUser;
};
export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

// Matches server config: access_token 30 min, refresh_token 15 days
export const ACCESS_COOKIE_OPTIONS = {
  sameSite: "lax" as const,
  expires: new Date(Date.now() + 30 * 60 * 1000),
};
export const REFRESH_COOKIE_OPTIONS = {
  sameSite: "lax" as const,
  expires: 15,
};

export const authApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [TagTypes.user],
    }),

    register: build.mutation<LoginResponse, RegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          Cookies.remove(ACCESS_TOKEN_KEY);
          Cookies.remove(REFRESH_TOKEN_KEY);
          Cookies.remove(USER_KEY);
          dispatch(clearAuth());
        }
      },
      invalidatesTags: TagTypeList,
    }),

    getMe: build.query<AuthUser, void>({
      query: () => "/auth/me",
      providesTags: [TagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
} = authApi;
