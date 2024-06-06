import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./redux/userSliceReducer";
import { fetchAppointments, cleanAppointments, selectAppointments } from "./redux/userAppointmentsSlice";
import { useEffect } from "react";

const ReduxComponent = () => {
  const loginResponse = {
    login: true,
    user: {
      id: 1,
      firstName: "Gio",
      lastName: "m",
      email: "gm@mail",
      birthdate: "1995-11-17",
      nDni: "1542633"
    }
  };

  const userById = {
    id: 1,
    firstName: "Gio",
    lastName: "m",
    email: "gm@mail",
    birthdate: "1995-11-17",
    nDni: "1542633",
    appointments: [
      // {
      //   id: 1,
      //   date: "2024-05-09",
      //   time: "09:15:00",
      //   status: "active",
      //   description: "hernia lumbar"
      // },
      // {
      //   id: 2,
      //   date: "2024-05-09",
      //   time: "09:15:00",
      //   status: "active",
      //   description: "hernia lumbar"
      // }
    ]
  };

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  // const appointmentState = useSelector((state) => state.appointments);
  const appointments = useSelector(selectAppointments);

  useEffect(() => {
    if (userState.login) {
      console.log("Fetching appointments for user:", userById.appointments);
      dispatch(fetchAppointments(userById.appointments));
    }
  }, [userState.login, dispatch]);
  console.log("Appointments state:", appointments);


  const firstName = userState?.user?.firstName;

  const handleLogin = () => {
    dispatch(login(loginResponse));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(cleanAppointments());
  };

  return (
    <>
      <h2>User {firstName}</h2>
      {/* <button onClick={() => dispatch(login(loginResponse))}>Login</button>
      <button onClick={() => dispatch(logout())}>Logout</button> */}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>

      {userState.login && (
        appointments && appointments.length > 0 ? (
          <pre>{JSON.stringify(appointments, null, 2)}</pre>
        )
          : (
            <p>No hay turnos agendados para este usuario.</p>
          )
      )}
    </>
  );
};

export default ReduxComponent;
