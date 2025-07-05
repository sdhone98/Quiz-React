import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import topicReducer from './topicSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    topic: topicReducer,
  },
});
