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
  totalAmount: 0,
  costing: 0,
  cash: 0,
  due: 0,
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
      const cart = [...state?.cart];
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
      let costing = 0;
      for (let product of cart) {
        // checking action for update quantity
        if (payloadActionFor === "quantity") {
          if (product?._id === payloadId) {
            newObj["quantity"] = payloadValue;
            updatedCart.push(newObj);
            totalAmount = totalAmount + payloadValue * product?.price;
            // costing =
            //   costing +
            //   Number(newObj?.quantity) *
            //     (Number(product?.selectedPurchase?.buyingCost) +
            //       Number(product?.selectedPurchase?.serviceCost));
          } else if (product?._id !== payloadId) {
            updatedCart.push(product);
            totalAmount = totalAmount + product?.quantity * product?.price;
            // costing =
            //   costing +
            //   Number(product?.quantity) *
            //     (Number(product?.selectedPurchase?.buyingCost) +
            //       Number(product?.selectedPurchase?.serviceCost));
          }
        }
        // checking action for update price
        if (payloadActionFor === "price") {
          if (product?._id === payloadId) {
            newObj["price"] = payloadValue;
            updatedCart.push(newObj);
            totalAmount = totalAmount + product?.quantity * payloadValue;
            // costing =
            //   costing +
            //   Number(newObj?.quantity) *
            //     (Number(product?.selectedPurchase?.buyingCost) +
            //       Number(product?.selectedPurchase?.serviceCost));
          } else if (product?._id !== payloadId) {
            updatedCart.push(product);
            totalAmount = totalAmount + product?.quantity * product?.price;
            // costing =
            //   costing +
            //   Number(product?.quantity) *
            //     (Number(product?.selectedPurchase?.buyingCost) +
            //       Number(product?.selectedPurchase?.serviceCost));
          }
        }
        // checking action for select purchase
        if (payloadActionFor === "selectedPurchase") {
          if (product?._id === payloadId) {
            newObj["selectedPurchase"] = newObj?.purchase[payloadIndex];
            newObj["price"] = newObj?.purchase[payloadIndex]?.sellingPrice;
            updatedCart.push(newObj);
            totalAmount = totalAmount + product?.quantity * newObj["price"];
            // costing =
            //   costing +
            //   Number(newObj?.quantity) *
            //     (Number(product?.selectedPurchase?.buyingCost) +
            //       Number(product?.selectedPurchase?.serviceCost));
          } else if (product?._id !== payloadId) {
            updatedCart.push(product);
            totalAmount = totalAmount + product?.quantity * product?.price;
            // costing =
            //   costing +
            //   Number(product?.quantity) *
            //     (Number(product?.selectedPurchase?.buyingCost) +
            //       Number(product?.selectedPurchase?.serviceCost));
          }
        }
      }
      console.log("costing:", costing);
      state.costing = costing;
      state.cart = updatedCart;
      state.totalAmount = totalAmount;
    },
    // remove product from cart
    removeProduct: (state, action) => {
      const productId = action.payload?.productId;
      const cart = state.cart;
      let totalAmount = state.totalAmount;
      let newCart = [];

      // find the product into cart
      const findProduct = cart?.find((product) => product?._id === productId);

      for (let product of cart) {
        if (product?._id !== productId) {
          newCart?.push(product);
        } else {
          totalAmount =
            totalAmount - findProduct?.price * findProduct?.quantity;
        }
      }
      state.cart = newCart;
      state.totalAmount = totalAmount;
    },
    // handling cash and due
    handlingCashDue: (state, action) => {
      let cash = action?.payload?.cash;
      let due = action?.payload?.due;
      const actionFor = action?.payload?.actionFor;
      const totalAmount = state.totalAmount;

      if (actionFor === "cash") {
        state.cash = cash;
        state.due = totalAmount - cash;
      } else if (actionFor === "due") {
        state.due = due;
        state.cash = totalAmount - due;
      }
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
  handlingCashDue,
  removeProduct,
} = CartSlice.actions;
export default CartSlice.reducer;
