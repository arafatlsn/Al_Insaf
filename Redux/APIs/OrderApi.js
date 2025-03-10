import baseApi from "./baseApi";

export const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/place-order",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = OrderApi;
