import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishListApi from '../../api/apiWishList';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { isUserLoggedIn } from '../../utils/auth';

const wishListSlice = createSlice({
  name: 'wishList',
  initialState: {
    wishList: JSON.parse(localStorage.getItem('wishList')) || [],
    isLoading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getWishList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.wishList = action.payload;
        state.isLoading = false;
        localStorage.setItem('wishList', JSON.stringify(state.wishList));
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        state.wishList.push(action.payload);
        localStorage.setItem('wishList', JSON.stringify(state.wishList));
      })
      .addCase(removeWishList.fulfilled, (state, action) => {
        state.wishList = state.wishList.filter((w) => w.id !== action.payload);
        toast.info('Item has been remove from your wish list!');
        localStorage.setItem('wishList', JSON.stringify(state.wishList));
      });
  },
});

export const wishListSelector = (state) => state.wishListSlice.wishList;
export const wishListAction = wishListSlice.actions;

export const getWishList = createAsyncThunk('wishList/getWishList', async () => {
  const res = await wishListApi.getMywishList();
  return res.data;
});

export const addWishList = createAsyncThunk('wishList/addWishList', async (product) => {
  if (isUserLoggedIn()) {
    const res = await wishListApi.addWishList(product.id);
    return res.data;
  } else {
    let newWishList = {
      id: uuidv4(),
      productId: product.id,
      product: product,
    };
    return newWishList;
  }
});

export const removeWishList = createAsyncThunk('wishList/removeWishList', async (id) => {
  if (isUserLoggedIn()) {
    await wishListApi.removeWishList(id);
  }
  return id;
});

export default wishListSlice;
