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

    updateProduct: (state, action) => {
      const cart = state?.cart;
      const payloadId = action.payload?.id;
      const payloadValue = action.payload?.value;
      const payloadActionFor = action.payload?.actionFor;
      const payloadIndex = action.payload?.index;

      // find the product
      const findProduct = state.cart?.find(
        (product) => product?._id === payloadId
      );
      if (!findProduct) {
        toast.error("Can't Find the Product");
        return;
      }
      const newObj = { ...findProduct };
      const updatedCart = [];
      let totalAmount = 0;
      for (let product of cart) {
        // checking action for update quantity
        if (payloadActionFor === "quantity") {
          if (product?._id === payloadId) {
            newObj["quantity"] = payloadValue;
            updatedCart.push(newObj);
            totalAmount = totalAmount + payloadValue * product?.price;
          } else if (product?._id !== payloadId) {
            updatedCart.push(product);
            totalAmount = totalAmount + product?.quantity * product?.price;
          }
        }
        // checking action for update price
        if (payloadActionFor === "price") {
          if (product?._id === payloadId) {
            newObj["price"] = payloadValue;
            updatedCart.push(newObj);
            totalAmount = totalAmount + product?.quantity * payloadValue;
          } else if (product?._id !== payloadId) {
            updatedCart.push(product);
            totalAmount = totalAmount + product?.quantity * product?.price;
          }
        }
        // checking action for select purchase
        if (payloadActionFor === "selectedPurchase") {
          if (product?._id === payloadId) {
            newObj["selectedPurchase"] = newObj?.purchase[payloadIndex];
            newObj["price"] = newObj?.purchase[payloadIndex]?.sellingPrice;
            updatedCart.push(newObj);
            totalAmount = totalAmount + product?.quantity * newObj["price"];
          } else if (product?._id !== payloadId) {
            updatedCart.push(product);
            totalAmount = totalAmount + product?.quantity * product?.price;
          }
        }
      }
      state.cart = updatedCart;
      state.totalAmount = totalAmount;
    },
    // reset slice
    resetCart: () => initialState,
  },
});

export const {
  updateCartSlice,
  addToCart,
  resetCart,
  updateProduct,
  // updateQuantity,
  // updateCart,
} = CartSlice.actions;
export default CartSlice.reducer;
