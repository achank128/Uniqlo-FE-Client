//Cart
export const cartSelector = (state) => state.cartSlice.cart;
export const hotelIdSelector = (state) => state.cartSlice.hotelId;
export const checkInDateSelector = (state) => state.cartSlice.checkInDate;
export const checkOutDateSelector = (state) => state.cartSlice.checkOutDate;
export const nightsNumberSelector = (state) => state.cartSlice.nightsNumber;
export const amountSelector = (state) => state.cartSlice.amount;
export const subTotalSelector = (state) => state.cartSlice.subTotal;
export const totalSelector = (state) => state.cartSlice.total;
export const isSuccessSelector = (state) => state.cartSlice.isSuccess;

//Search
export const datesSelector = (state) => state.searchSlice.dates;
export const searchSelector = (state) => state.searchSlice.search;
export const filterSelector = (state) => state.searchSlice.filter;
export const peopleAmountSelector = (state) => state.searchSlice.peopleAmount;

//Snackbar
export const isOpenSelector = (state) => state.toastSlice.isOpen;
export const messageSelector = (state) => state.toastSlice.message;
export const typeSelector = (state) => state.toastSlice.type;

//Favorite
export const favoriteHotelsSelector = (state) => state.favoriteSlice.favoriteHotels;
