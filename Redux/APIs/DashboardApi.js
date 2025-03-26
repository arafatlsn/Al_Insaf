import baseApi from "./baseApi";

export const DashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashbaordData: builder.query({
      query: () => "/dashboard",
      method: "GET",
      providesTags: ["dashboard"]
    }),
  }),
});

export const { useDashbaordDataQuery } = DashboardApi;
