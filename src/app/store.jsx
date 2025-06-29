import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";

// Only hydrate cartList from localStorage ONCE, at app startup
const preloadedState = {
  cart: {
    cartList: JSON.parse(localStorage.getItem("cartList")) || [],
  },
};

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
  preloadedState, // <-- add this line!
});

export default store;