import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';
import userSlice from './userSlice';
import usersSlice from './usersSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    posts: postsSlice,
    users: usersSlice,
  },
});
