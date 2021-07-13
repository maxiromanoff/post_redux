import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const postsReducer = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    addPosts: (state, action) => {
      state.unshift(action.payload);
      return state;
    },

    removePosts: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },

    updatePosts: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { addPosts, removePosts, updatePosts } = postsReducer.actions;
export default postsReducer.reducer;
