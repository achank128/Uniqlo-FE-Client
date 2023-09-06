import { createSlice } from '@reduxjs/toolkit';

const initialUser = () => {
  const item = window.localStorage.getItem('userData');
  return item ? JSON.parse(item) : {};
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser(),
    accessToken: localStorage.getItem('accessToken'),
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
    },
    handleLogOut: (state, action) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
    },
    handleLogin: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
    },
  },
});

export const userSelector = (state) => state.authSlice.user;
export const accessTokenSelector = (state) => state.authSlice.accessToken;

export const authAction = authSlice.actions;

export default authSlice;
