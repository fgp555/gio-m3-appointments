// front\src\views\MisTurnos\MisTurnos.jsx

import React, { useEffect, useState } from "react";
import Turno from "../../components/Turno/Turno";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import apiServices from "../../services/apiServices";
import { fetchAppointments } from "../../redux/userAppointmentsSlice";
import "./MisTurnos.css";

const MisTurnos = () => {
  const [appoinmentState, setAppoinment] = useState({
    date: "2024-12-22",
    time: "13:00",
    description: "description",
  });

  const appoinmentStore = useSelector((state) => state.appointments);
  const userStore = useSelector((state) => state.user);

  console.log("userStore", userStore.user.email);
  const userId = userStore?.user?.id;
  const dispatch = useDispatch();

  const getUserAppointments = () => {
    if (userId) {
      apiServices.fetchUserAppointments(userId).then((response) => {
        dispatch(fetchAppointments(response));
      });
    }
  };

  useEffect(() => {
    getUserAppointments();
  }, [dispatch, userId]);

  const handleCancel = (id, date) => {
    const today = new Date();
    const appointmentDate = new Date(date);

    // Set times to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);
    appointmentDate.setDate(appointmentDate.getDate() - 1);
    appointmentDate.setHours(0, 0, 0, 0);

    if (today >= appointmentDate) {
      alert("Los turnos solo se pueden cancelar hasta un día antes del turno.");
      return;
    }

    apiServices.cleanAppointments(id).then((response) => {
      apiServices.fetchUserAppointments(userId).then((response) => {
        dispatch(fetchAppointments(response));
      });
    });
  };

  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setAppoinment({ ...appoinmentState, [name]: value });

    if (name === "date") {
      const today = new Date();
      const selectedDate = new Date(value);
      const day = selectedDate.getUTCDay();

      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        alert("Los turnos solo se pueden agendar para fechas futuras.");
        setAppoinment({ ...appoinmentState, date: "" });
      } else if ([6, 0].includes(day)) {
        alert("La fecha seleccionada cae en fin de semana. Por favor, seleccione una fecha entre lunes y viernes.");
        setAppoinment({ ...appoinmentState, date: "" });
      } else {
        setAppoinment({ ...appoinmentState, date: value });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTime = new Date(`2000-01-01T${appoinmentState.time}`);
    const startTime = new Date(`2000-01-01T07:00:00`);
    const endTime = new Date(`2000-01-01T19:00:00`);

    if (selectedTime < startTime || selectedTime > endTime) {
      alert("Los turnos solo se pueden agendar entre las 7:00 AM y las 7:00 PM.");
      return;
    }

    const turnoData = {
      ...appoinmentState,
      userId,
    };

    apiServices
      .createAppointment(turnoData)
      // getUserAppointments
      .then((x) => {
        getUserAppointments();
        // setAppoinment({ date: "", time: "", description: "" });
      });
  };

  return (
    <div>
      <h1>Turnos</h1>
      <h3>Usuario estos son tus turnos</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input type="date" name="date" value={appoinmentState.date} onChange={handleChangeForm} required />
        </div>
        <div>
          <label>Hora:</label>
          <input type="time" name="time" value={appoinmentState.time} onChange={handleChangeForm} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" name="description" value={appoinmentState.description} onChange={handleChangeForm} required />
        </div>
        <button type="submit">Crear Turno</button>
      </form>

      {appoinmentStore.length === 0 ? (
        <p>No hay turnos agendados para el usuario</p>
      ) : (
        appoinmentStore.map((turno) => (
          <Turno
            key={turno.id}
            date={turno.date}
            time={turno.time}
            status={turno.status}
            description={turno.description}
            user={turno.user}
            id={turno.id}
            handleCancel={() => handleCancel(turno.id, turno.date)}
          />
        ))
      )}

      {/* <pre>{JSON.stringify(userStore.user.email, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(userStore, null, 2)}</pre> */}
    </div>
  );
};

export default MisTurnos;
