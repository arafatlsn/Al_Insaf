import baseApi from "./baseApi";

export const createProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => "/product",
      method: "GET",
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["suppliers"],
    }),
  }),
});

export const { useCreateProductMutation, useFetchProductsQuery } =
  createProductApi;
