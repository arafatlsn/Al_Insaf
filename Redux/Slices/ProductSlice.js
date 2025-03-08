import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  description: "",
  category: "",
  price: 0,
  images: [],
  buyingPrice: 0,
  stock: 0,
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
  },
});

export const { updateProductSlice } = ProductSlice.actions
export default ProductSlice.reducer;
