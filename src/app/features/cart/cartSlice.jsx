import { createSlice } from "@reduxjs/toolkit";

const storedCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList"))
    : [];

const initialState = {
  cartList: storedCartList,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload.product;
      const quantity = action.payload.num;
      const existing = state.cartList.find(item => item.id === productToAdd.id);
      if (existing) {
        existing.qty += quantity;
      } else {
        state.cartList.push({ ...productToAdd, qty: quantity });
      }
    },
    decreaseQty: (state, action) => {
      const product = action.payload;
      const existing = state.cartList.find(item => item.id === product.id);
      if (existing) {
        if (existing.qty === 1) {
          state.cartList = state.cartList.filter(item => item.id !== product.id);
        } else {
          existing.qty -= 1;
        }
      }
    },
    deleteProduct: (state, action) => {
      const product = action.payload;
      state.cartList = state.cartList.filter(item => item.id !== product.id);
    },
    clearCart: (state) => {
      state.cartList = [];
    },
  },
});

// Persist cartList to localStorage on any cart action
export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith("cart/")) {
    const cartList = store.getState().cart.cartList;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }
  return result;
};

export const { addToCart, decreaseQty, deleteProduct, clearCart } = cartSlice.actions;

export default cartSlice.reducer;