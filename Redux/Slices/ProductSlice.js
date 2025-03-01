import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const ProductSlice = createSlice({
  name: "product_slice",
  initialState,
  reducers: {
    updateProductSlice: (state, action) => {
      const actionPayload = action.payload;
      for (let property in actionPayload) {
        state[property] = actionPayload[property];
      }
    },
  },
});

export default ProductSlice.reducer;
