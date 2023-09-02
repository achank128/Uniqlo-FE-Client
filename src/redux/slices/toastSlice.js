import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'search',
  initialState: {
    isOpen: false,
    type: 'success',
    message: 'Thành công',
  },
  reducers: {
    showToast(state, action) {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeToast(state, action) {
      state.isOpen = false;
    },
  },
});
export default toastSlice;
