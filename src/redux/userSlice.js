import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  quizList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setQuizList: (state, action) => {
      state.quizList = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.quizList = [];
    },
  },
});

export const { setUser, setQuizList, logout } = userSlice.actions;
export default userSlice.reducer;
