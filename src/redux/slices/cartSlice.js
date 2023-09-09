import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '../../api/apiCart';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { isUserLoggedIn } from '../../utils/auth';

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
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state, action) => {
        state.isLoadingCart = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoadingCart = false;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const inCartItem = state.cart.cartItems.find((item) => item.id === action.payload.id);
        if (inCartItem) {
          state.cart.cartItems = state.cart.cartItems.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: action.payload.quantity };
            }
            return item;
          });
          toast.success('Item has been update in your cart!');
        } else {
          state.cart.cartItems.push(action.payload);
          toast.success('Item has been add to your cart!');
        }
        localStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        console.log('update quantity:', action.payload);
        state.cart.cartItems = state.cart.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        });
        localStorage.setItem('cart', JSON.stringify(state.cart));
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
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
    if (isUserLoggedIn()) {
      let upbody = {
        id: itemInCart.id,
        quantity: itemInCart.quantity + body.quantity,
      };
      const res = await cartApi.updateQuantityCartItem(upbody);
      return res.data;
    } else {
      itemInCart.quantity = itemInCart.quantity + body.quantity;
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
export const amountSelector = (state) => state.cartSlice.amount;
export const subTotalSelector = (state) => state.cartSlice.subtotal;

export const cartAction = cartSlice.actions;

export default cartSlice;
