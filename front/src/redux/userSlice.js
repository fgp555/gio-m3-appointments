import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },

    cleanUser: (state) => {
      localStorage.removeItem("user");
      return {};
    },
  },
});

export const { cleanUser, fetchUser } = userSlice.actions;
export default userSlice;
