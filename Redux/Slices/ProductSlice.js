import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  category: "",
  price: 0,
  purchase: [],
  images: [],
  supplier: "",
  newSupplier: { name: "", contact: "", address: "" },
  sku: "",
  unitType: "",
  expiryDate: "",
};

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
    resetProductSlice: () => initialState,
  },
});

export const { updateProductSlice, resetProductSlice } = ProductSlice.actions;
export default ProductSlice.reducer;
