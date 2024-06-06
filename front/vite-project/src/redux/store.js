import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userAppointmentsSlice from "./userAppointmentsSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    appointments: userAppointmentsSlice
  }
});

export default store;
