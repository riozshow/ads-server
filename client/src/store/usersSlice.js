import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'users',
  initialState: {
    all: [],
    search: [],
  },
  reducers: {
    addUser(state, action) {
      if (!state.all.find((user) => user._id === action.payload._id)) {
        state.all.push(action.payload);
      }
    },
  },
});

export const getUser = (state, id) =>
  state.users.all.find((post) => post._id === id);

export const { addUser } = postsSlice.actions;

export default postsSlice.reducer;
