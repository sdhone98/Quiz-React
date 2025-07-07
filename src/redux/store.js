import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import topicReducer from './topicSlice';
import quizReducer from './quizSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    topic: topicReducer,
    quiz: quizReducer,
  },
});
