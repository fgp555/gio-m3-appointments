import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userAppointmentsSlice = createSlice({
  name: "appointments",
  initialState: [],
  reducers: {
    fetchAppointments: (state, action) => {
      // console.log("fetchAppointments action payload:", action.payload);
      return action.payload;
    },
    cleanAppointments: () => {
      return [];
    },
  },
});

export const selectAppointments = (state) => state.appointments;

export const { cleanAppointments, fetchAppointments } = userAppointmentsSlice.actions;
export default userAppointmentsSlice.reducer;
