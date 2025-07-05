import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topics: ["Q"],
  difficulties: ["awd"],
  selectedTopic: null,
  selectedDifficulty: null,
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
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    setSelectedDifficulty: (state, action) => {
      state.selectedDifficulty = action.payload;
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
  setSelectedTopic,
  setSelectedDifficulty,
  resetTopicDifficultySelection,
} = topicSlice.actions;

export default topicSlice.reducer;
