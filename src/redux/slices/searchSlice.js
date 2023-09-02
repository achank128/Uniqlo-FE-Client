import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: '',
    filter: {
      star: null,
      locationId: [],
      typeId: [],
    },
    dates: [
      {
        startDate: new Date(),
        endDate: new Date(),
        // endDate: new Date().setDate(new Date().getDate() + 1),
        key: 'selection',
      },
    ],
    peopleAmount: 1,
  },
  reducers: {
    setDates(state, action) {
      state.dates = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    increasePeopleAmount(state, action) {
      if (state.peopleAmount < 4) {
        state.peopleAmount++;
      }
    },
    decreasePeopleAmount(state, action) {
      if (state.peopleAmount > 1) {
        state.peopleAmount--;
      }
    },
  },
});
export default searchSlice;
