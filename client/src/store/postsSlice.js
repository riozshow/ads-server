import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    all: [],
    search: [],
  },
  reducers: {
    addPosts(state, action) {
      for (const post of action.payload) {
        if (!state.all.find((p) => p._id === post._id)) {
          state.all.push(post);
        }
      }
    },
    addPost(state, action) {
      if (!state.all.find((p) => p._id === action.payload._id)) {
        state.all.push(action.payload);
      }
    },
    editPost(state, action) {
      state.all = state.all.filter((post) => post._id !== action.payload._id);
      state.all.push(action.payload);
    },
    deletePost(state, action) {
      state.all = state.all.filter((post) => post._id !== action.payload);
    },
    addSearchedPosts(state, action) {
      for (const post of action.payload) {
        if (!state.search.find((p) => p._id === post._id)) {
          state.search.push(post);
        }
      }
    },
    addSearchedPost(state, action) {
      if (!state.search.find((p) => p._id === action.payload._id)) {
        state.search.push(action.payload);
      }
    },
    clearSearchedPosts(state) {
      state.search = [];
    },
  },
});

export const getAllPosts = (state) => state.posts.all;
export const getPost = (state, id) =>
  state.posts.all.find((post) => post._id === id);
export const getAllSearchedPosts = (state) => state.posts.search;
export const getSearchedPost = (state, id) =>
  state.posts.search.find((post) => post._id === id);

export const {
  addPosts,
  addPost,
  editPost,
  deletePost,
  addSearchedPost,
  addSearchedPosts,
  clearSearchedPosts,
} = postsSlice.actions;

export default postsSlice.reducer;
