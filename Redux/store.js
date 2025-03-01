import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProductSlice  from "./Slices/ProductSlice";

export const store = configureStore({
  reducer: {
    product_slice: ProductSlice,
  },
});
