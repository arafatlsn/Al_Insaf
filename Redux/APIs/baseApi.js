import { url } from "@/utils/url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),
  tagTypes: ["suppliers", "products", "customers"],
  endpoints: () => ({}),
});

export default baseApi;
