import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';
import wishListSlice from './slices/wishListSlice';

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    cartSlice: cartSlice.reducer,
    wishListSlice: wishListSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
