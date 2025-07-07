import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizData: {},
  setQuizData: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizData: (state, action) => {
      state.quizData = action.payload;
    },
    setSelectedQuizData: (state, action) => {
      state.setQuizData = action.payload;
    },
    resetQuizData: (state) => {
      state.quizData = [];
      state.setQuizData = null;
    },
  },
});

export const { setQuizData, setSelectedQuizData, resetQuizData } =
  quizSlice.actions;

export default quizSlice.reducer;
