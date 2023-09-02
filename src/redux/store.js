import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import searchSlice from './slices/searchSlice';
import toastSlice from './slices/toastSlice';
import favoriteSlice from './slices/favoriteSlice';

const store = configureStore({
  reducer: {
    cartSlice: cartSlice.reducer,
    searchSlice: searchSlice.reducer,
    toastSlice: toastSlice.reducer,
    favoriteSlice: favoriteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
