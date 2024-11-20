import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userAppointmentsSlice = createSlice({
  name: "appointments",
  initialState: [],
  reducers: {
    fetchAppointments: (state, action) => {
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
