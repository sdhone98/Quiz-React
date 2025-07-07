import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topics: [],
  difficulties: [],
  quizSetsTypes: [],
  selectedTopic: null,
  selectedDifficulty: null,
  selectedSet: null,
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setDifficulties: (state, action) => {
      state.difficulties = action.payload;
    },
    setQuizSetsTypes: (state, action) => {
      state.quizSetsTypes = action.payload;
    },
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    setSelectedDifficulty: (state, action) => {
      state.selectedDifficulty = action.payload;
    },
    setSelectedSet: (state, action) => {
      state.selectedSet = action.payload;
    },
    resetTopicDifficultySelection: (state) => {
      state.selectedTopic = null;
      state.selectedDifficulty = null;
    },
  },
});

export const {
  setTopics,
  setDifficulties,
  setQuizSetsTypes,
  setSelectedTopic,
  setSelectedDifficulty,
  setSelectedSet,
  resetTopicDifficultySelection,
} = topicSlice.actions;

export default topicSlice.reducer;
