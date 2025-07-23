import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: null,
  refresh_token: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload;
    },
    resetToken: (state) => {
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setAccessToken, setRefreshToken, resetToken } =
  tokenSlice.actions;

export default tokenSlice.reducer;
