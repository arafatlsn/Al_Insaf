import baseApi from "./baseApi";

export const CustomerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCustomers: builder.query({
      query: () => "/customers",
      providesTags: ["customers"],
    }),
  }),
});

export const { useFetchCustomersQuery } = CustomerApi;
