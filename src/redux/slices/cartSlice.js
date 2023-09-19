import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../api/apiCart';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { isUserLoggedIn } from '../../utils/auth';
import { t } from 'i18next';

const cartDefault = {
  id: uuidv4(),
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: JSON.parse(localStorage.getItem('cart')) || cartDefault,
    amount: 0,
    subtotal: 0,
    discount: 0,
    total: 0,
    coupon: null,
    isLoadingCart: false,
  },
  reducers: {
    updateTotal(state, action) {
      let { amount, subtotal } = state.cart.cartItems.reduce(
        ({ amount, subtotal }, item) => {
          let price = item.product.productPrice.price;
          if (item.product.isSale) {
            price = item.product.productPrice.promoPrice;
          }
          amount += item.quantity;
          subtotal += item.quantity * price;
          return { amount, subtotal };
        },
        { amount: 0, subtotal: 0 },
      );
      state.amount = amount;
      state.subtotal = subtotal;
      state.total = subtotal;
    },

    addCoupon(state, action) {
      if (state.subtotal >= action.payload.totalFrom) {
        state.coupon = action.payload;
        if (action.payload.percent) {
          let discount = state.subtotal * (action.payload.percent / 100);
          if (discount > action.payload.max) {
            discount = action.payload.max;
          }
          state.discount = discount;
          state.total = state.subtotal - discount;
        } else {
          state.discount = action.payload.discount;
          state.total = state.subtotal - action.payload.discount;
        }
      } else {
        toast.error(t('cart_total_not_enough'));
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state, action) => {
        state.isLoadingCart = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.cart.cartItems = state.cart.cartItems.map((item) => {
          if (item.quantity > item.productDetail.inStock) {
            item.quantity = item.productDetail.inStock;
            return item;
          }
          return item;
        });
        state.isLoadingCart = false;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(addCartItem.pending, (state, action) => {
        state.isLoadingCart = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.isLoadingCart = false;
        const inCartItem = state.cart.cartItems.find((item) => item.id === action.payload.id);
        if (inCartItem) {
          state.cart.cartItems = state.cart.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: action.payload.quantity };
            }
            return item;
          });
        } else {
          state.cart.cartItems.push(action.payload);
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(updateQuantity.pending, (state, action) => {
        state.isLoadingCart = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.isLoadingCart = false;
        state.cart.cartItems = state.cart.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        });
        localStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(removeCartItem.pending, (state, action) => {
        state.isLoadingCart = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.isLoadingCart = false;
        state.cart.cartItems = state.cart.cartItems.filter((item) => item.id !== action.payload);
        toast.info('Item has been removed from your cart!');
        localStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cart.cartItems = [];
        state.amount = 0;
        state.subtotal = 0;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      });
  },
});

export const getCart = createAsyncThunk('cart/getCart', async () => {
  const res = await cartApi.getMyCart();
  return res.data;
});

export const addCartItem = createAsyncThunk('cart/addCartItem', async (body, thunkAPI) => {
  let state = thunkAPI.getState().cartSlice;
  const itemInCart = state.cart.cartItems.find(
    (item) => item.productDetailId === body.productDetailId,
  );

  if (itemInCart) {
    let newQuantity = itemInCart.quantity + body.quantity;
    if (newQuantity < itemInCart.productDetail.inStock) {
      if (isUserLoggedIn()) {
        let upbody = {
          id: itemInCart.id,
          quantity: newQuantity,
        };
        const res = await cartApi.updateQuantityCartItem(upbody);
        return res.data;
      } else {
        itemInCart.quantity = newQuantity;
        return itemInCart;
      }
    } else {
      toast.warning(t('cart_item_out_of_quantity'));
      return itemInCart;
    }
  } else {
    if (isUserLoggedIn()) {
      const res = await cartApi.addCartItem(body);
      return res.data;
    } else {
      body.id = uuidv4();
      return body;
    }
  }
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async (body) => {
  const res = await cartApi.updateQuantityCartItem(body);
  return res.data;
});

export const removeCartItem = createAsyncThunk('cart/removeCartItem', async (id) => {
  if (isUserLoggedIn()) {
    await cartApi.removeCartItem(id);
  }
  return id;
});

export const clearCart = createAsyncThunk('cart/clearCart', async (id) => {
  if (isUserLoggedIn()) {
    await cartApi.clearCart(id);
  }
  return id;
});

export const cartSelector = (state) => state.cartSlice.cart;
export const loadingCartSelector = (state) => state.cartSlice.isLoadingCart;
export const amountSelector = (state) => state.cartSlice.amount;
export const subTotalSelector = (state) => state.cartSlice.subtotal;
export const discountSelector = (state) => state.cartSlice.discount;
export const totalSelector = (state) => state.cartSlice.total;
export const couponSelector = (state) => state.cartSlice.coupon;

export const cartAction = cartSlice.actions;

export default cartSlice;
