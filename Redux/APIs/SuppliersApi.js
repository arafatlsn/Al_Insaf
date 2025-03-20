import baseApi from "./baseApi";

export const SuppliersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSuppliers: builder.query({
      query: () => "/suppliers",
      providesTags: ["suppliers"]
    })
  }),
});

export const { useFetchSuppliersQuery } = SuppliersApi;
