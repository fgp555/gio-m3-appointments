import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    const response = await fetch(`http://localhost:3000/users/${Number(userId)}`);
    const user = await response.json();
    return user;
  }
);

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  // fetchUser: (state, action) => {
  //    return action.payload
  //   },
   
    cleanUser: (state) => {
      return {}
    }
  }
});

export const { cleanUser} = userSlice.actions;
export default userSlice
