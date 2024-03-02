import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    login(state, action) {
      return action.payload.user;
    },
    logout() {
      return {};
    },
  },
});

export const getUser = (state) => state.user;
export const isLogged = (state) => state.user.login;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
