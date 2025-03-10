import { toast } from "react-toastify";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cart: [],
  customer: "",
  newCustomer: {
    name: "",
    contact: "",
    address: "",
  },
  totalAmount: "",
  paymentStatus: "paid",
};

export const CartSlice = createSlice({
  name: "cart_slice",
  initialState,
  reducers: {
    updateCartSlice: (state, action) => {
      const actionPayload = action.payload;
      for (let property in actionPayload) {
        state[property] = actionPayload[property];
      }
    },
    // adding product to cart
    addToCart: (state, action) => {
      const actionPayload = action.payload;
      // checking already exist
      const find = state.cart?.find((el) => el?._id === actionPayload?._id);
      if (!find) {
        const newObj = { ...actionPayload };
        newObj["quantity"] = 1;
        state.cart = [...state.cart, newObj];
      } else {
        toast.error("already added in cart");
      }
      let totalAmount = 0;
      for (let product of state?.cart) {
        totalAmount = totalAmount + product?.quantity * product?.price;
      }
      state.totalAmount = totalAmount;
    },
    // update quantity
    updateQuantity: (state, action) => {
      const cart = state?.cart;
      const payloadProduct = { ...action.payload.product };
      payloadProduct["quantity"] = Number(action.payload.value);
      const updatedCart = [];
      let totalAmount = 0;
      for (let product of cart) {
        if (product?._id === payloadProduct?._id) {
          updatedCart.push(payloadProduct);
        } else if (product?._id !== payloadProduct?._id) {
          updatedCart.push(product);
        }
      }
      state.cart = updatedCart;
      for (let product of updatedCart) {
        totalAmount = totalAmount + product?.quantity * product?.price;
      }
      state.totalAmount = totalAmount;
    },
    // reset slice
    resetCart: () => initialState,
  },
});

export const { updateCartSlice, addToCart, resetCart, updateQuantity } =
  CartSlice.actions;
export default CartSlice.reducer;
