import baseApi from "./baseApi";

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/place-order",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders", "products"],
    }),
    fetchOrders: builder.query({
      query: ({ filter, search }) =>
        `/orders?filter=${encodeURIComponent(
          filter
        )}&search=${encodeURIComponent(search)}`,
      method: "GET",
      providesTags: ["orders"],
    }),
  }),
});

export const { usePlaceOrderMutation, useFetchOrdersQuery } = OrderApi;
