import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducer';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
