import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'search',
  initialState: {
    favoriteHotels: [],
  },
  reducers: {
    addToFavorite(state, action) {
      const hotel = state.favoriteHotels.find((h) => h.id === action.payload.id);
      if (!hotel) {
        state.favoriteHotels.unshift(action.payload);
      }
      localStorage.setItem('favorite', JSON.stringify(state.favoriteHotels));
    },
    removeFromFavorite(state, action) {
      state.favoriteHotels = state.favoriteHotels.filter((h) => h.id !== action.payload.id);
      localStorage.setItem('favorite', JSON.stringify(state.favoriteHotels));
    },
    setLocalFavorite(state, action) {
      const favorite = JSON.parse(localStorage.getItem('favorite'));
      if (favorite?.length > 0) {
        state.favoriteHotels = favorite;
      }
    },
  },
});
export default favoriteSlice;
