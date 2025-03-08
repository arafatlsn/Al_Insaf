import baseApi from "./baseApi";

export const createProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
    })
  }),
});

export const { useCreateProductMutation } = createProductApi;
