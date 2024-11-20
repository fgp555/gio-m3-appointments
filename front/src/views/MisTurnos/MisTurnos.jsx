import React, { useEffect, useState } from "react";
import Turno from "../../components/Turno/Turno";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import apiServices from "../../services/apiServices";
import { fetchAppointments } from "../../redux/userAppointmentsSlice";
import "./MisTurnos.css";

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const [newTurno, setNewTurno] = useState({
    date: "",
    time: "",
    description: "",
  });

  const turnosState = useSelector((state) => state.appointments);
  const user = useSelector((state) => state.user);
  const userId = user?.user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      apiServices.getAppointments(userId).then((response) => {
        dispatch(fetchAppointments(response));
      });
    }
  }, [dispatch, user]);

  // const handleCancel = (id) => {
  //     apiServices.cleanAppointments(id).then((response) => {
  //         apiServices.getAppointments(userId).then((response) => {
  //             dispatch(fetchAppointments(response));
  //         });
  //     });
  // };
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
      apiServices.getAppointments(userId).then((response) => {
        dispatch(fetchAppointments(response));
      });
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTurno({ ...newTurno, [name]: value });

    if (name === "date") {
      const today = new Date();
      const selectedDate = new Date(value);
      const day = selectedDate.getUTCDay();

      today.setHours(0, 0, 0, 0);

      if (selectedDate <= today) {
        alert("Los turnos solo se pueden agendar para fechas futuras.");
        setNewTurno({ ...newTurno, date: "" });
      } else if ([6, 0].includes(day)) {
        alert("La fecha seleccionada cae en fin de semana. Por favor, seleccione una fecha entre lunes y viernes.");
        setNewTurno({ ...newTurno, date: "" });
      } else {
        setNewTurno({ ...newTurno, date: value });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedTime = new Date(`2000-01-01T${newTurno.time}`);
    const startTime = new Date(`2000-01-01T07:00:00`);
    const endTime = new Date(`2000-01-01T19:00:00`);

    if (selectedTime < startTime || selectedTime > endTime) {
      alert("Los turnos solo se pueden agendar entre las 7:00 AM y las 7:00 PM.");
      return;
    }

    const turnoData = {
      ...newTurno,
      userId,
    };

    axios
      .post("http://localhost:3000/appointments/schedule", turnoData, {
        headers: {
          "Content-Type": "application/json",
          token: "autenticado",
        },
      })
      .then((response) => {
        apiServices.getAppointments(userId).then((response) => {
          dispatch(fetchAppointments(response));
        });
        setNewTurno({ date: "", time: "", description: "" });
      })
      .catch((error) => {
        console.error("There was an error creating the appointment!", error);
      });
  };

  return (
    <div>
      <h1>Turnos</h1>
      <h3>Usuario estos son tus turnos</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Fecha:</label>
          <input type="date" name="date" value={newTurno.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Hora:</label>
          <input type="time" name="time" value={newTurno.time} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" name="description" value={newTurno.description} onChange={handleChange} required />
        </div>
        <button type="submit">Crear Turno</button>
      </form>

      {turnosState.length === 0 ? (
        <p>No hay turnos agendados para el usuario</p>
      ) : (
        turnosState.map((turno) => (
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
    </div>
  );
};

export default MisTurnos;
