import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "./api/base-query";
import { TagTypeList } from "@/types/tagTypes";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: TagTypeList,
  endpoints: () => ({}),
});
