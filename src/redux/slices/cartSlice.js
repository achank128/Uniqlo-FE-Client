import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    hotelId: '',
    checkInDate: null,
    checkOutDate: null,
    nightsNumber: 0,
    amount: 0,
    subTotal: 0,
    total: 0,
    isSuccess: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.isSuccess = false;

      if (!state.hotelId) {
        state.hotelId = action.payload.item.hotelId;
      }

      if (!state.checkInDate && !state.checkOutDate) {
        let nights =
          (action.payload.checkOutDate - action.payload.checkInDate) /
          (1000 * 3600 * 24);
        if (nights >= 1) {
          state.checkInDate = action.payload.checkInDate;
          state.checkOutDate = action.payload.checkOutDate;
          state.nightsNumber = nights;
        }
      }

      //Add to cart
      if (
        state.hotelId === action.payload.item.hotelId &&
        state.checkInDate === action.payload.checkInDate &&
        state.checkOutDate === action.payload.checkOutDate
      ) {
        for (let i = 0; i < action.payload.quantity; i++) {
          state.cart.push({
            ...action.payload.item,
            roomId: action.payload.item.roomList[i].roomId,
            personName: '',
            quantity: 1,
          });
        }

        //update Amount,Total
        let { amount, subTotal, total } = state.cart.reduce(
          ({ amount, subTotal, total }, item) => {
            const { quantity, promoPrice, basePrice } = item;
            amount += quantity;
            subTotal += quantity * basePrice * state.nightsNumber;
            total += quantity * promoPrice * state.nightsNumber;
            return { amount, subTotal, total };
          },
          { amount: 0, subTotal: 0, total: 0 },
        );
        state.amount = amount;
        state.subTotal = subTotal;
        state.total = total;

        state.isSuccess = true;
      } else {
        alert(
          'Không thể thêm phòng Khác khách sạn hoặc Khác ngày check in/check out trước đó vào giỏ!',
        );
      }
    },
    removeFormCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.roomId !== action.payload);

      if (state.cart.length < 1) {
        state.hotelId = '';
        state.checkInDate = null;
        state.checkOutDate = null;
      }

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

    resetCart(state, action) {
      state.cart = [];
      state.hotelId = '';
      state.checkInDate = null;
      state.checkOutDate = null;
      state.amount = 0;
      state.subTotal = 0;
      state.total = 0;
      state.nightsNumber = 0;
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

    setItemPersonName(state, action) {
      const cartItem = state.cart.find(
        (item) => item.roomId === action.payload.roomId,
      );
      cartItem.personName = action.payload.personName;
    },
  },
});
export default cartSlice;
