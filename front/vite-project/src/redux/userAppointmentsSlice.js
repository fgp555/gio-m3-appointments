import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserAppointments = createAsyncThunk(
  'appointments/fetchUserAppointments',
  async (userId) => {
    const response = await fetch(`http://localhost:3000/appointments/schedule`);
    const appointments = await response.json();
    return appointments;
  }
);

const userAppointmentsSlice = createSlice({
  name: 'appointments',
  initialState: [],
  reducers: {
    fetchAppointments: (state, action) => {
      console.log("fetchAppointments action payload:", action.payload);
      return action.payload;
    },
    cleanAppointments: () => {
      return [];
    }
  }
});

export const selectAppointments = (state) => state.appointments;

export const { cleanAppointments, fetchAppointments } = userAppointmentsSlice.actions;
export default userAppointmentsSlice.reducer;


