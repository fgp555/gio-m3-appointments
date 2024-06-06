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
        description: ""
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

    const handleCancel = (id) => {
        apiServices.cleanAppointments(id).then((response) => {
            apiServices.getAppointments(userId).then((response) => {
                dispatch(fetchAppointments(response));
            });
        });
    };

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTurno({ ...newTurno, [name]: value });
        const selectedDate = new Date(e.target.value);
        const day = selectedDate.getUTCDay();
        if ([6, 0].includes(day)) {
            alert('La fecha seleccionada cae en fin de semana. Por favor, seleccione una fecha entre lunes y viernes.');
            setFecha('');
        } else {
            setFecha(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación de horario
        const selectedTime = new Date(`2000-01-01T${newTurno.time}`);
        const startTime = new Date(`2000-01-01T07:00:00`);
        const endTime = new Date(`2000-01-01T19:00:00`);

        if (selectedTime < startTime || selectedTime > endTime) {
            alert("Los turnos solo se pueden agendar entre las 7:00 AM y las 7:00 PM.");
            return;
        }

        const turnoData = {
            ...newTurno,
            userId
        };

        axios.post("http://localhost:3000/appointments/schedule", turnoData, {
            headers: {
                'Content-Type': 'application/json',
                'token': 'autenticado'
            }
        }).then(response => {
            apiServices.getAppointments(userId).then((response) => {
                dispatch(fetchAppointments(response));
            });
            setNewTurno({ date: "", time: "", description: "" }); 
        }).catch(error => {
            console.error("There was an error creating the appointment!", error);
        });
    };

    return (
        <div>
            <h1>Turnos</h1>
            <h3>Usuario estos son tus turnos</h3>

            
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Fecha:</label>
                    <input
                        type="date"
                        name="date"
                        value={newTurno.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Hora:</label>
                    <input
                        type="time"
                        name="time"
                        value={newTurno.time}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="description"
                        value={newTurno.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Crear Turno</button>
            </form>

            {turnosState.length === 0 ? (
                <p>No hay turnos agendados para el usuario</p>
            ) : (
                turnosState.map(turno => (
                    <Turno
                        key={turno.id}
                        date={turno.date}
                        time={turno.time}
                        status={turno.status}
                        description={turno.description}
                        user={turno.user}
                        id={turno.id}
                        handleCancel={handleCancel}
                    />
                ))
            )}

        </div>
    );
}

export default MisTurnos;
