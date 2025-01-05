import { configureStore } from '@reduxjs/toolkit';
import { cartSlice } from './cartSlice';

// Use the reducer property from the cartSlice
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer, // Access the reducer from the slice
  },
});
