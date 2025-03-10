import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./Slices/ProductSlice";
import baseApi from "./APIs/baseApi";
import CartSlice from "./Slices/CartSlice";

export const store = configureStore({
  reducer: {
    product_slice: ProductSlice,
    cart_slice: CartSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});
