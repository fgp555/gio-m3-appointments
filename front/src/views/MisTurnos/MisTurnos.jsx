import React, { useEffect, useState } from "react";
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

    today.setHours(0, 0, 0, 0);
    appointmentDate.setDate(appointmentDate.getDate() - 1);
    appointmentDate.setHours(0, 0, 0, 0);

    if (today >= appointmentDate) {
      alert("Los turnos solo se pueden cancelar hasta un día antes del turno.");
      return;
    }

    apiServices.cleanAppointments(id).then(() => {
      getUserAppointments();
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

    apiServices.createAppointment(turnoData).then(() => {
      getUserAppointments();
    });
  };

  return (
    <div className="main">
      <h1>Turnos de {userStore.user.firstName}</h1>

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
        <table className="appointments-table">
          <caption>Turnos Agendados</caption>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Descripción</th>
              {/* <th>Estado</th> */}
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {appoinmentStore.map((turno) => (
              <tr key={turno.id}>
                <td>{turno.date}</td>
                <td>{turno.time}</td>
                <td>{turno.description}</td>
                {/* <td>{turno.status}</td> */}
                <td>
                  <button
                    onClick={() => handleCancel(turno.id, turno.date)}
                    className={turno.status === "active" ? "btn-active" : "btn-cancelled"}
                    disabled={turno.status !== "active"} // Deshabilitar el botón si el estado no es 'active'
                  >
                    {turno.status === "active" ? "Cancelar" : "Cancelled"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MisTurnos;
