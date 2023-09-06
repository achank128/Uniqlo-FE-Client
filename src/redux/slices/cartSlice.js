import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    amount: 0,
    subTotal: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      let newCart = [];
      const isItemInCart = state.cart.find((item) => item.id === action.payload.item.id);

      if (isItemInCart) {
        if (
          isItemInCart.colorId === action.payload.colorId &&
          isItemInCart.sizeId === action.payload.sizeId
        ) {
          newCart = state.cart.map((item) =>
            item._id === action.payload.item._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          );
        } else {
          newCart = [
            ...state.cart,
            {
              ...action.payload.item,
              itemId: action.payload.itemId,
              color: action.payload.color,
              size: action.payload.size,
              quantity: action.payload.quantity,
            },
          ];
        }
      } else {
        newCart = [
          ...state.cart,
          {
            ...action.payload.item,
            itemId: action.payload.itemId,
            color: action.payload.color,
            size: action.payload.size,
            quantity: action.payload.quantity,
          },
        ];
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return { ...state, cart: newCart };
    },

    removeFormCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);

      //update Amount,Total
      let { amount, subTotal, total } = state.cart.reduce(
        ({ amount, subTotal, total }, item) => {
          const { quantity, promoPrice, basePrice } = item;
          amount += quantity;
          subTotal += quantity * basePrice;
          total += quantity * promoPrice;
          return { amount, subTotal, total };
        },
        { amount: 0, subTotal: 0, total: 0 },
      );
      state.amount = amount;
      state.subTotal = subTotal;
      state.total = total;
    },

    updateTotal(state, action) {
      //update Amount,Total
      let { amount, subTotal, total } = state.cart.reduce(
        ({ amount, subTotal, total }, item) => {
          const { quantity, promoPrice, basePrice } = item;
          amount += quantity;
          subTotal += quantity * basePrice;
          total += quantity * promoPrice;
          return { amount, subTotal, total };
        },
        { amount: 0, subTotal: 0, total: 0 },
      );
      state.amount = amount;
      state.subTotal = subTotal;
      state.total = total;
    },
  },
});

export const cartSelector = (state) => state.cartSlice.cart;
export const amountSelector = (state) => state.cartSlice.amount;
export const subTotalSelector = (state) => state.cartSlice.subTotal;
export const totalSelector = (state) => state.cartSlice.total;
export const cartAction = cartSlice.actions;

export default cartSlice;
