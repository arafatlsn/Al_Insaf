import baseApi from "./baseApi";

export const createProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: ({ filter, search }) =>
        `/product?filter=${encodeURIComponent(
          filter
        )}&search=${encodeURIComponent(search)}`,
      method: "GET",
      providesTags: ["products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["suppliers", "dashboard"],
    }),
  }),
});

export const { useCreateProductMutation, useFetchProductsQuery } =
  createProductApi;
