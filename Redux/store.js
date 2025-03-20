import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";
import baseApi from "./APIs/baseApi";
import CartSlice from "./Slices/CartSlice";
import FilterSlice from "./Slices/FilterSlice";

export const store = configureStore({
  reducer: {
    product_slice: ProductSlice,
    cart_slice: CartSlice,
    filter_slice: FilterSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});
