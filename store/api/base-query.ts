import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

import { logout, setAccessToken } from "@/store/slices/auth.slice";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const USER_KEY = "auth_user";

const ACCESS_COOKIE_OPTIONS = {
  sameSite: "lax" as const,
  expires: new Date(Date.now() + 30 * 60 * 1000), // 30 min
};
const REFRESH_COOKIE_OPTIONS = { sameSite: "lax" as const, expires: 15 }; // 15 days

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders(headers) {
    const token = Cookies.get(ACCESS_TOKEN_KEY);
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await rawBaseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    const { data } = refreshResult;
    if (data && typeof data === "object" && "accessToken" in data) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        data as { accessToken: string; refreshToken?: string };
      Cookies.set(ACCESS_TOKEN_KEY, newAccessToken, ACCESS_COOKIE_OPTIONS);
      api.dispatch(setAccessToken(newAccessToken));

      // Rotate refresh token if the server returns a new one
      if (newRefreshToken) {
        Cookies.set(REFRESH_TOKEN_KEY, newRefreshToken, REFRESH_COOKIE_OPTIONS);
      }

      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      Cookies.remove(ACCESS_TOKEN_KEY);
      Cookies.remove(REFRESH_TOKEN_KEY);
      api.dispatch(logout());
    }
  }

  return result;
};
