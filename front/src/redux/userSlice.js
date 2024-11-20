import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state, action) => {
      return action.payload;
    },

    cleanUser: (state) => {
      return {};
    },
  },
});

export const { cleanUser, fetchUser } = userSlice.actions;
export default userSlice;
